import React from 'react';
import cs from 'clsx';
import {Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {DataTableItem, DataTableStructureItem} from './dataTable.types';
import {CustomTableRow} from './CustomTableRow';
import {noop} from '../../utils/noop';

type DataTableProps = {
  items: DataTableItem[];
  uniqueFieldName: string;
  structure: DataTableStructureItem[];
  isEditableItem?: (row: DataTableItem) => boolean;
  isRemovableItem?: (row: DataTableItem) => boolean;
  onAddItemClick?: () => void;
  onRemoveItemClick?: (uniqueValue: any) => void;
  onEditItemClick?: (uniqueValue: any) => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      marginBottom: '30px',
    },

    bottomRightActionsRoot: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      transform: 'translateY(50%) translateX(30%)',
    },
  })
);

export function DataTable ({
  items,
  uniqueFieldName,
  structure,
  onEditItemClick = noop,
  onRemoveItemClick = noop,
  onAddItemClick = noop,
  isEditableItem,
  isRemovableItem,
}: DataTableProps) {
  const classes = useStyles();
  const isEditable = typeof isEditableItem !== 'undefined'
    || typeof isRemovableItem !== 'undefined';
  return (
    <div className={cs(classes.root)}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {isEditable && <TableCell />}
              {structure.map(({title}, index) => (
                <TableCell
                  key={title}
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => {
              return (
                <CustomTableRow
                  key={item[uniqueFieldName]}
                  item={item}
                  uniqueFieldName={uniqueFieldName}
                  structure={structure}
                  onRemoveItemClick={onRemoveItemClick}
                  onEditItemClick={onEditItemClick}
                  isEditableItem={isEditableItem}
                  isRemovableItem={isRemovableItem}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={cs(classes.bottomRightActionsRoot)}>
        <Fab
          size="medium"
          color="primary"
          onClick={onAddItemClick}
        >
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}
