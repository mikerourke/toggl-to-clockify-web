import React from "react";
import {
  BaseEntityModel,
  TableViewModel,
} from "~/allEntities/allEntitiesTypes";

interface Props extends React.HTMLProps<HTMLTableCellElement> {
  entityRecord: TableViewModel<BaseEntityModel>;
  onFlipIsIncluded: (id: string) => void;
}

const InclusionsTableCheckboxCell: React.FC<Props> = ({
  entityRecord,
  onFlipIsIncluded,
  ...props
}) => (
  <td data-include={true} {...props}>
    <input
      type="checkbox"
      checked={entityRecord.existsInTarget ? false : entityRecord.isIncluded}
      disabled={entityRecord.existsInTarget}
      onChange={() => onFlipIsIncluded(entityRecord.id)}
    />
  </td>
);

export default InclusionsTableCheckboxCell;