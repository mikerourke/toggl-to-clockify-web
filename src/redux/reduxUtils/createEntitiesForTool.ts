import { SagaIterator } from "@redux-saga/types";

import * as R from "ramda";
import { call, delay, put, select } from "redux-saga/effects";

import { incrementEntityGroupTransferCompletedCount } from "~/allEntities/allEntitiesActions";
import { EntityGroup, ToolName, ValidEntity } from "~/typeDefs";
import { workspaceIdToLinkedIdSelector } from "~/workspaces/workspacesSelectors";

import { getApiDelayForTool } from "./fetchActions";

/**
 * Loops through specified source records and calls the specified apiCreateFunc
 * on each record to create it on the target.
 */
export function* createEntitiesForTool<TEntity>({
  toolName,
  sourceRecords,
  apiCreateFunc,
}: {
  toolName: ToolName;
  sourceRecords: TEntity[];
  apiCreateFunc: (sourceRecord: AnyValid, workspaceId: string) => SagaIterator;
}): SagaIterator<TEntity[]> {
  const apiDelay = getApiDelayForTool(toolName);

  const validSourceRecords = sourceRecords as ValidEntity<TEntity>[];
  const targetRecords: TEntity[] = [];
  for (const sourceRecord of validSourceRecords) {
    // If the target workspace isn't in state, move to the next record. This
    // _shouldn't_ normally happen, but we're doing it here just to hedge
    // our bets:
    const targetWorkspaceId = yield call(
      findTargetWorkspaceId,
      sourceRecord.workspaceId,
    );
    if (R.isNil(targetWorkspaceId)) {
      continue;
    }

    const targetRecord = yield call(
      apiCreateFunc,
      sourceRecord,
      targetWorkspaceId,
    );
    if (!R.isNil(targetRecord)) {
      targetRecords.push(targetRecord);
    }

    const entityGroup = sourceRecord.memberOf as EntityGroup;
    yield put(incrementEntityGroupTransferCompletedCount(entityGroup));

    yield delay(apiDelay);
  }

  return targetRecords;
}

/**
 * Returns the target workspace ID associated with the specified source
 * workspace ID. If not found, return null.
 */
function* findTargetWorkspaceId(
  sourceWorkspaceId: string,
): SagaIterator<string | null> {
  const workspaceIdToLinkedId = yield select(workspaceIdToLinkedIdSelector);

  return R.propOr<null, Record<string, string>, string>(
    null,
    sourceWorkspaceId,
    workspaceIdToLinkedId,
  );
}
