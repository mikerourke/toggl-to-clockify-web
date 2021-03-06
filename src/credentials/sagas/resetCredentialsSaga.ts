import { SagaIterator } from "@redux-saga/types";

import { put } from "redux-saga/effects";

import { flushCredentials } from "~/credentials/credentialsActions";
import { getIfDev } from "~/utils";

/**
 * If the user changes the tool action or mapping, we don't want to keep the
 * credentials in state. The API keys may no longer apply or only one set of
 * API keys is required.
 */
export function* resetCredentialsSaga(): SagaIterator {
  if (getIfDev()) {
    return;
  }

  yield put(flushCredentials());
}
