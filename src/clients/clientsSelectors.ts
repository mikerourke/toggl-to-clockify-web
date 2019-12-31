import { createSelector, createStructuredSelector, Selector } from "reselect";
import * as R from "ramda";
import { mappingByToolNameSelector } from "~/app/appSelectors";
import { sourceTimeEntryCountByIdFieldSelectorFactory } from "~/timeEntries/timeEntriesSelectors";
import { activeWorkspaceIdSelector } from "~/workspaces/workspacesSelectors";
import {
  ToolName,
  Mapping,
  TableViewModel,
} from "~/allEntities/allEntitiesTypes";
import { ReduxState } from "~/redux/reduxTypes";
import { ClientModel, ClientsByIdModel } from "./clientsTypes";

export const sourceClientsByIdSelector = createSelector(
  (state: ReduxState) => state.clients.source,
  (sourceClientsById): ClientsByIdModel => sourceClientsById,
);

const targetClientsByIdSelector = createSelector(
  (state: ReduxState) => state.clients.target,
  (targetClientsById): ClientsByIdModel => targetClientsById,
);

const sourceClientsSelector = createSelector(
  sourceClientsByIdSelector,
  (sourceClients): ClientModel[] => Object.values(sourceClients),
);

const targetClientsSelector = createSelector(
  targetClientsByIdSelector,
  (targetClientsById): ClientModel[] => Object.values(targetClientsById),
);

export const includedSourceClientsSelector = createSelector(
  sourceClientsSelector,
  (sourceClients): ClientModel[] =>
    sourceClients.filter(sourceClient => sourceClient.isIncluded),
);

const clientsByMappingSelector = createStructuredSelector<
  ReduxState,
  Record<Mapping, ClientModel[]>
>({
  source: sourceClientsSelector,
  target: targetClientsSelector,
});

export const sourceClientsForTransferSelector = createSelector(
  includedSourceClientsSelector,
  (sourceClients): ClientModel[] =>
    sourceClients.filter(sourceClient => R.isNil(sourceClient.linkedId)),
);

export const sourceClientsInActiveWorkspaceSelector = createSelector(
  sourceClientsSelector,
  activeWorkspaceIdSelector,
  (sourceClients, activeWorkspaceId) =>
    sourceClients.filter(
      sourceClient => sourceClient.workspaceId === activeWorkspaceId,
    ),
);

export const clientsForTableViewSelector = createSelector(
  sourceClientsInActiveWorkspaceSelector,
  sourceTimeEntryCountByIdFieldSelectorFactory("clientId"),
  (sourceClients, timeEntryCountByClientId): TableViewModel<ClientModel>[] =>
    sourceClients.map(sourceClient => {
      const existsInTarget = sourceClient.linkedId !== null;
      const entryCount = R.propOr<number, Record<string, number>, number>(
        0,
        sourceClient.id,
        timeEntryCountByClientId,
      );

      return {
        ...sourceClient,
        entryCount,
        existsInTarget,
        isActiveInSource: true,
        isActiveInTarget: existsInTarget,
      };
    }),
);

export const clientIdsByNameSelectorFactory = (
  toolName: ToolName,
): Selector<ReduxState, Record<string, string>> =>
  createSelector(
    mappingByToolNameSelector,
    clientsByMappingSelector,
    (mappingByToolName, clientsByMapping) => {
      const toolMapping = mappingByToolName[toolName];
      const clients = clientsByMapping[toolMapping];

      const clientIdsByName: Record<string, string> = {};
      for (const client of clients) {
        clientIdsByName[client.name] = client.id;
      }

      return clientIdsByName;
    },
  );
