import React from "react";
import { connect } from "react-redux";
import { PayloadActionCreator } from "typesafe-actions";
import { flipIsClientIncluded } from "~/clients/clientsActions";
import { clientsForTableViewSelector } from "~/clients/clientsSelectors";
import { AccordionPanel, EntitiesTable } from "~/components";
import { TableViewModel } from "~/allEntities/allEntitiesTypes";
import { ClientModel } from "~/clients/clientsTypes";
import { ReduxState } from "~/redux/reduxTypes";

interface ConnectStateProps {
  clients: TableViewModel<ClientModel>[];
}

interface ConnectDispatchProps {
  onFlipIsIncluded: PayloadActionCreator<string, string>;
}

type Props = ConnectStateProps & ConnectDispatchProps;

export const ClientsTableComponent: React.FC<Props> = props => (
  <AccordionPanel
    rowNumber={2}
    title={<span>Clients | Count: {props.clients.length}</span>}
  >
    <EntitiesTable
      tableFields={[
        { label: "Name", field: "name" },
        { label: "Time Entry Count", field: "entryCount" },
      ]}
      tableData={props.clients}
      onFlipIsIncluded={props.onFlipIsIncluded}
    />
  </AccordionPanel>
);

const mapStateToProps = (state: ReduxState): ConnectStateProps => ({
  clients: clientsForTableViewSelector(state),
});

const mapDispatchToProps: ConnectDispatchProps = {
  onFlipIsIncluded: flipIsClientIncluded,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ClientsTableComponent);
