import React from 'react';

export type DataTableItem = Record<string, any>;

type DataTableStructureCellGetter = {
  relatedFieldName: string;
} | {
  renderCell: (item: DataTableItem) => React.ReactNode;
};

export type DataTableStructureItem = {
  title: string;
} & DataTableStructureCellGetter;

export type uniqueFieldName = string;
