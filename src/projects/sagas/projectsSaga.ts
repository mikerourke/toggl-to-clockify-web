import { all, call, put, select, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { linkEntitiesByIdByMapping } from "~/redux/sagaUtils";
import { showFetchErrorNotification } from "~/app/appActions";
import { selectToolNameByMapping } from "~/app/appSelectors";
import { createProjects, fetchProjects } from "~/projects/projectsActions";
import { selectSourceProjectsForTransfer } from "~/projects/projectsSelectors";
import {
  createClockifyProjectsSaga,
  fetchClockifyProjectsSaga,
} from "./clockifyProjectsSagas";
import {
  createTogglProjectsSaga,
  fetchTogglProjectsSaga,
} from "./togglProjectsSagas";
import { ProjectModel } from "~/projects/projectsTypes";
import { ToolName } from "~/common/commonTypes";

export function* projectsSaga(): SagaIterator {
  yield all([
    takeEvery(createProjects.request, createProjectsSaga),
    takeEvery(fetchProjects.request, fetchProjectsSaga),
  ]);
}

function* createProjectsSaga(): SagaIterator {
  try {
    const toolNameByMapping = yield select(selectToolNameByMapping);
    const createSagaByToolName = {
      [ToolName.Clockify]: createClockifyProjectsSaga,
      [ToolName.Toggl]: createTogglProjectsSaga,
    }[toolNameByMapping.target];

    const sourceProjects = yield select(selectSourceProjectsForTransfer);
    const targetProjects = yield call(createSagaByToolName, sourceProjects);
    const projectsByIdByMapping = linkEntitiesByIdByMapping<ProjectModel>(
      sourceProjects,
      targetProjects,
    );

    yield put(createProjects.success(projectsByIdByMapping));
  } catch (err) {
    yield put(showFetchErrorNotification(err));
    yield put(createProjects.failure());
  }
}

function* fetchProjectsSaga(): SagaIterator {
  try {
    const fetchSagaByToolName = {
      [ToolName.Clockify]: fetchClockifyProjectsSaga,
      [ToolName.Toggl]: fetchTogglProjectsSaga,
    };
    const { source, target } = yield select(selectToolNameByMapping);
    const sourceProjects = yield call(fetchSagaByToolName[source]);
    const targetProjects = yield call(fetchSagaByToolName[target]);

    const projectsByIdByMapping = linkEntitiesByIdByMapping<ProjectModel>(
      sourceProjects,
      targetProjects,
    );

    yield put(fetchProjects.success(projectsByIdByMapping));
  } catch (err) {
    yield put(showFetchErrorNotification(err));
    yield put(fetchProjects.failure());
  }
}