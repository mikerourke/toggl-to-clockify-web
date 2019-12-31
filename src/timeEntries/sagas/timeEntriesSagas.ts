import { SagaIterator } from "@redux-saga/types";
import { call, put, select } from "redux-saga/effects";
import differenceInMinutes from "date-fns/differenceInMinutes";
import * as R from "ramda";
import { showFetchErrorNotification } from "~/app/appActions";
import { toolNameByMappingSelector } from "~/app/appSelectors";
import {
  createTimeEntries,
  fetchTimeEntries,
} from "~/timeEntries/timeEntriesActions";
import { sourceTimeEntriesForTransferSelector } from "~/timeEntries/timeEntriesSelectors";
import {
  createClockifyTimeEntriesSaga,
  fetchClockifyTimeEntriesSaga,
} from "./clockifyTimeEntriesSagas";
import {
  createTogglTimeEntriesSaga,
  fetchTogglTimeEntriesSaga,
} from "./togglTimeEntriesSagas";
import { Mapping, ToolName } from "~/allEntities/allEntitiesTypes";
import {
  TimeEntryModel,
  TimeEntriesByIdModel,
} from "~/timeEntries/timeEntriesTypes";

export function* createTimeEntriesSaga(): SagaIterator {
  yield put(createTimeEntries.request());

  try {
    const toolNameByMapping = yield select(toolNameByMappingSelector);
    const createSagaByToolName = {
      [ToolName.Clockify]: createClockifyTimeEntriesSaga,
      [ToolName.Toggl]: createTogglTimeEntriesSaga,
    }[toolNameByMapping.target];

    const sourceTimeEntries = yield select(
      sourceTimeEntriesForTransferSelector,
    );
    const targetTimeEntries = yield call(
      createSagaByToolName,
      sourceTimeEntries,
    );

    const timeEntriesByIdByMapping = linkTimeEntriesByIdByMapping(
      sourceTimeEntries,
      targetTimeEntries,
    );

    yield put(createTimeEntries.success(timeEntriesByIdByMapping));
  } catch (err) {
    yield put(showFetchErrorNotification(err));
    yield put(createTimeEntries.failure());
  }
}

export function* fetchTimeEntriesSaga(): SagaIterator {
  yield put(fetchTimeEntries.request());

  try {
    const fetchSagaByToolName = {
      [ToolName.Clockify]: fetchClockifyTimeEntriesSaga,
      [ToolName.Toggl]: fetchTogglTimeEntriesSaga,
    };
    const { source, target } = yield select(toolNameByMappingSelector);
    let sourceTimeEntries = yield call(fetchSagaByToolName[source]);
    let targetTimeEntries = yield call(fetchSagaByToolName[target]);

    sourceTimeEntries = sortTimeEntries(sourceTimeEntries);
    targetTimeEntries = sortTimeEntries(targetTimeEntries);

    const timeEntriesByIdByMapping = linkTimeEntriesByIdByMapping(
      sourceTimeEntries,
      targetTimeEntries,
    );

    yield put(fetchTimeEntries.success(timeEntriesByIdByMapping));
  } catch (err) {
    yield put(showFetchErrorNotification(err));
    yield put(fetchTimeEntries.failure());
  }
}

function sortTimeEntries(timeEntries: TimeEntryModel[]): TimeEntryModel[] {
  return timeEntries.sort((a, b) => b.start.getTime() - a.start.getTime());
}

function linkTimeEntriesByIdByMapping(
  sourceTimeEntries: TimeEntryModel[],
  targetTimeEntries: TimeEntryModel[],
): Record<Mapping, TimeEntriesByIdModel> {
  if (sourceTimeEntries.length === 0) {
    return {
      source: {},
      target: {},
    };
  }

  const sortByDate = R.sortBy(R.prop("start"));
  const sortedSourceEntries = sortByDate(sourceTimeEntries);
  const sortedTargetEntries = sortByDate(targetTimeEntries);

  const sourceById: TimeEntriesByIdModel = {};
  const targetById: TimeEntriesByIdModel = {};

  for (const sourceEntry of sortedSourceEntries) {
    sourceById[sourceEntry.id] = sourceEntry;

    for (const targetEntry of sortedTargetEntries) {
      targetById[targetEntry.id] = targetEntry;

      // TODO: Make sure this actually works!
      if (doTimeEntriesMatch(sourceEntry, targetEntry)) {
        sourceById[sourceEntry.id].linkedId = targetEntry.id;
        targetById[targetEntry.id].linkedId = sourceEntry.id;
      }
    }
  }

  return {
    source: sourceById,
    target: targetById,
  };
}

/**
 * Compares the two time entries and returns true if they _appear_ to match
 * based on the date, description, flags, etc.
 */
function doTimeEntriesMatch(
  sourceEntry: TimeEntryModel,
  targetEntry: TimeEntryModel,
): boolean {
  if (
    [
      sourceEntry.description !== targetEntry.description,
      sourceEntry.year !== targetEntry.year,
      sourceEntry.isActive !== targetEntry.isActive,
      sourceEntry.isBillable !== targetEntry.isBillable,
    ].some(Boolean)
  ) {
    return false;
  }

  return differenceInMinutes(sourceEntry.start, targetEntry.start) <= 1;
}
