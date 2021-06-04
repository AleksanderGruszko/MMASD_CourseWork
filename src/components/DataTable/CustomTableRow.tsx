import React from 'react';
import clsx from 'clsx';
import {withStyles, Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {DataTableItem, DataTableStructureItem} from './dataTable.types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    actionButtonsRoot: {
      padding: '0 10px',
      display: 'flex',
    },
  })
);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },

      '&:hover': {
        backgroundColor: fade(theme.palette.action.hover, .1),
      },
    },
  }),
)(TableRow);

type CustomTableRowProps = {
  item: DataTableItem;
  uniqueFieldName: string;
  structure: DataTableStructureItem[];
  isEditableItem?: (row: DataTableItem) => boolean;
  isRemovableItem?: (row: DataTableItem) => boolean;
  onRemoveItemClick: (uniqueValue: any) => void;
  onEditItemClick: (uniqueValue: any) => void;
};

export function CustomTableRow ({
  item,
  structure,
  uniqueFieldName,
  isEditableItem,
  isRemovableItem,
  onRemoveItemClick,
  onEditItemClick,
}: CustomTableRowProps) {
  const classes = useStyles();
  const itemUniqueName = item[uniqueFieldName];

  const isEditable = typeof isEditableItem !== 'undefined'
    || typeof isRemovableItem !== 'undefined';

  const handleRemoveBtnClick = () => {
    onRemoveItemClick(itemUniqueName);
  };

  const handleEditBtnClick = () => {
    onEditItemClick(itemUniqueName);
  };

  const ActionsCell = () => {
    if (!isEditable) {
      return null;
    }

    return (
      <TableCell padding={"checkbox"}>
        <div className={clsx(classes.actionButtonsRoot)}>
          {isRemovableItem && isRemovableItem(item) && (
            <IconButton
              onClick={handleRemoveBtnClick}
            >
              <DeleteIcon fontSize={"small"}/>
            </IconButton>
          )}
          {isEditableItem && isEditableItem(item) && (
            <IconButton
              onClick={handleEditBtnClick}
            >
              <EditIcon fontSize={'small'}/>
            </IconButton>
          )}
        </div>
      </TableCell>
    )
  };

  return (
    <StyledTableRow>
      <ActionsCell />
      {structure.map(({relatedFieldName}, index) => {
        const cellContent = item[relatedFieldName];
        return (
          <TableCell
            key={`${item[uniqueFieldName]}_${cellContent}`}
            scope={!!index ? 'row' : undefined}
          >
            {item[relatedFieldName]}
          </TableCell>
        );
      })}
    </StyledTableRow>
  );
}
