import { push } from "connected-react-router";
import * as R from "ramda";
import { call, put, select } from "redux-saga/effects";
import { SagaIterator } from "@redux-saga/types";
import { currentPathSelector } from "~/app/appSelectors";
import { validateCredentials } from "~/credentials/credentialsActions";
import { areCredentialsValidSelector } from "~/credentials/credentialsSelectors";
import { fetchObject } from "~/redux/sagaUtils";
import { TogglWorkspaceResponseModel } from "~/workspaces/sagas/togglWorkspacesSagas";
import { RoutePath } from "~/app/appTypes";
import { CredentialsModel } from "~/credentials/credentialsTypes";

interface TogglMeResponseModel {
  since: number;
  data: {
    id: number;
    default_wid: number;
    email: string;
    fullname: string;
    at: string;
    created_at: string;
    timezone: string;
    workspaces: TogglWorkspaceResponseModel[];
  };
}

export function* validateCredentialsSaga(): SagaIterator {
  const credentials: Partial<CredentialsModel> = {
    clockifyUserId: "",
    togglEmail: "",
    togglUserId: "",
  };

  const validationErrorByTool: Record<string, string> = {};

  try {
    const clockifyUser = yield call(fetchObject, "/clockify/api/v1/user");
    credentials.clockifyUserId = clockifyUser.id;
  } catch (err) {
    validationErrorByTool[err.toolName] = "Invalid API key";
  }

  try {
    const togglUser: TogglMeResponseModel = yield call(
      fetchObject,
      "/toggl/api/me",
    );
    credentials.togglEmail = togglUser.data.email;
    credentials.togglUserId = togglUser.data.id.toString();
  } catch (err) {
    validationErrorByTool[err.toolName] = "Invalid API key";
  }

  const areCredentialsValid = yield select(areCredentialsValidSelector);
  const currentPath = yield select(currentPathSelector);
  if (
    [
      R.isEmpty(validationErrorByTool),
      areCredentialsValid,
      R.equals(currentPath, RoutePath.Credentials),
    ].every(Boolean)
  ) {
    yield put(push(RoutePath.Workspaces));
    yield put(validateCredentials.success(credentials));
  } else {
    yield put(validateCredentials.failure(validationErrorByTool));
  }
}
