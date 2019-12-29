/* eslint-disable @typescript-eslint/camelcase */
import differenceInSeconds from "date-fns/differenceInSeconds";
import endOfYear from "date-fns/endOfYear";
import format from "date-fns/format";
import startOfYear from "date-fns/startOfYear";
import qs from "qs";
import * as R from "ramda";
import { call, select, delay } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { TOGGL_API_DELAY } from "~/constants";
import {
  createEntitiesForTool,
  fetchEntitiesForTool,
  fetchObject,
} from "~/redux/sagaUtils";
import { clientIdsByNameForToolSelector } from "~/clients/clientsSelectors";
import { credentialsSelector } from "~/credentials/credentialsSelectors";
import { targetProjectIdSelector } from "~/projects/projectsSelectors";
import { targetTaskIdSelector } from "~/tasks/tasksSelectors";
import { EntityGroup, ToolName } from "~/entities/entitiesTypes";
import { TimeEntryModel } from "~/timeEntries/timeEntriesTypes";

interface TogglTotalCurrencyModel {
  currency: string | null;
  amount: number | null;
}

interface TogglTimeEntryResponseModel {
  id: number;
  pid: number;
  tid: number | null;
  uid: number;
  description: string;
  start: string;
  end: string;
  updated: string;
  dur: number;
  user: string;
  use_stop: boolean;
  client: string;
  project: string;
  project_color: string;
  project_hex_color: string;
  task: string | null; // Name of task
  billable: number | null;
  is_billable: boolean;
  cur: string | null;
  tags: string[];
}

interface TogglTimeEntriesFetchResponseModel {
  total_grand: number;
  total_billable: number | null;
  total_currencies: TogglTotalCurrencyModel[];
  total_count: number;
  per_page: number;
  data: TogglTimeEntryResponseModel[];
}

/**
 * Creates Toggl time entries in all workspaces and returns array of transformed
 * time entries.
 * @see https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md#create-a-time-entry
 */
export function* createTogglTimeEntriesSaga(
  sourceTimeEntries: TimeEntryModel[],
): SagaIterator<TimeEntryModel[]> {
  return yield call(createEntitiesForTool, {
    toolName: ToolName.Toggl,
    sourceRecords: sourceTimeEntries,
    apiCreateFunc: createTogglTimeEntry,
  });
}

/**
 * Fetches all time entries in Toggl workspaces and returns array of
 * transformed time entries.
 * @see https://github.com/toggl/toggl_api_docs/blob/master/reports/detailed.md#detailed-report
 */
export function* fetchTogglTimeEntriesSaga(): SagaIterator<TimeEntryModel[]> {
  return yield call(fetchEntitiesForTool, {
    toolName: ToolName.Toggl,
    apiFetchFunc: fetchTogglTimeEntriesInWorkspace,
  });
}

function* createTogglTimeEntry(
  sourceTimeEntry: TimeEntryModel,
  targetWorkspaceId: string,
): SagaIterator {
  const targetProjectId = yield select(
    targetProjectIdSelector,
    sourceTimeEntry.projectId,
  );
  const targetTaskId = yield select(
    targetTaskIdSelector,
    sourceTimeEntry.taskId,
  );
  const timeEntryRequest = {
    time_entry: {
      description: sourceTimeEntry.description,
      tags: sourceTimeEntry.tagNames,
      duration: differenceInSeconds(sourceTimeEntry.end, sourceTimeEntry.start),
      start: sourceTimeEntry.start.toISOString(),
      wid: +targetWorkspaceId,
      pid: R.isNil(targetProjectId) ? undefined : +targetProjectId,
      tid: R.isNil(targetTaskId) ? undefined : +targetTaskId,
      billable: sourceTimeEntry.isBillable,
      created_with: "transfermyti.me",
    },
  };

  yield call(fetchObject, "/toggl/api/time_entries", {
    method: "POST",
    body: timeEntryRequest,
  });
}

function* fetchTogglTimeEntriesInWorkspace(
  workspaceId: string,
): SagaIterator<TimeEntryModel[]> {
  const togglTimeEntries: TogglTimeEntryResponseModel[] = [];
  const currentYear = new Date().getFullYear();
  const { togglEmail } = yield select(credentialsSelector);
  const clientIdsByName = yield select(
    clientIdsByNameForToolSelector,
    ToolName.Toggl,
  );

  for (let year = 2007; year <= currentYear; year += 1) {
    const timeEntriesForYear = yield call(
      fetchTogglTimeEntriesForYear,
      togglEmail,
      workspaceId,
      year,
    );

    if (timeEntriesForYear.length !== 0) {
      togglTimeEntries.push(...timeEntriesForYear);
    }

    yield delay(TOGGL_API_DELAY);
  }

  return togglTimeEntries.map(togglTimeEntry => {
    const clientId = R.propOr<null, string, string>(
      null,
      togglTimeEntry.client,
      clientIdsByName,
    );
    return transformFromResponse(togglTimeEntry, workspaceId, clientId);
  });
}

function* fetchTogglTimeEntriesForYear(
  email: string,
  workspaceId: string,
  year: number,
): SagaIterator<TogglTimeEntryResponseModel[]> {
  const {
    total_count: totalCount,
    per_page: perPage,
    data: firstPageEntries,
  } = yield call(
    fetchTogglTimeEntriesForYearAndPage,
    email,
    workspaceId,
    year,
    1,
  );

  if (totalCount === 0) {
    return [];
  }

  if (totalCount < perPage) {
    return firstPageEntries;
  }

  const allTimeEntries = firstPageEntries;
  const totalPages = Math.ceil(totalCount / perPage);

  for (let page = 2; page <= totalPages; page += 1) {
    const { data } = yield call(
      fetchTogglTimeEntriesForYearAndPage,
      email,
      workspaceId,
      year,
      page,
    );
    allTimeEntries.push(...data);

    yield delay(TOGGL_API_DELAY);
  }

  return allTimeEntries;
}

function* fetchTogglTimeEntriesForYearAndPage(
  email: string,
  workspaceId: string,
  year: number,
  page: number,
): SagaIterator<TogglTimeEntriesFetchResponseModel> {
  const currentDate = new Date();
  currentDate.setFullYear(year);
  const DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
  const firstDay = format(startOfYear(currentDate), DATE_FORMAT);
  const lastDay = format(endOfYear(currentDate), DATE_FORMAT);

  const query = qs.stringify({
    workspace_id: workspaceId,
    since: firstDay,
    until: lastDay,
    user_agent: email,
    page: page,
  });

  return yield call(fetchObject, `/toggl/reports/details?${query}`);
}

function transformFromResponse(
  timeEntry: TogglTimeEntryResponseModel,
  workspaceId: string,
  clientId: string | null,
): TimeEntryModel {
  const startTime = getTime(timeEntry, "start");
  return {
    id: timeEntry.id.toString(),
    description: timeEntry.description,
    isBillable: timeEntry.is_billable,
    start: startTime,
    end: getTime(timeEntry, "end"),
    year: startTime.getFullYear(),
    isActive: false,
    clientId,
    projectId: timeEntry.pid.toString(),
    tagIds: [],
    tagNames: timeEntry.tags,
    taskId: R.isNil(timeEntry.tid) ? null : timeEntry.tid.toString(),
    userId: timeEntry.uid.toString(),
    userGroupIds: [],
    workspaceId,
    entryCount: 0,
    linkedId: null,
    isIncluded: true,
    memberOf: EntityGroup.TimeEntries,
  };
}

function getTime(
  timeEntry: TogglTimeEntryResponseModel,
  field: "start" | "end",
): Date {
  const value = R.pathOr(null, [field], null);
  return R.isNil(value) ? new Date() : new Date(value);
}
