import {DataTable} from '../../components/molecules/DataTable';
import React from 'react';

const ITEMS = [
  {id: '1', name: 'Vasya', age: 32},
  {id: '2', name: 'Petya', age: 25},
];
const STRUCTURE = [
  {title: 'user name', relatedFieldName: 'name'},
  {title: 'user age', relatedFieldName: 'age'},
];

export default function ExamplePage () {
  return (
    <React.Fragment>
      <DataTable
        items={ITEMS}
        uniqueFieldName="id"
        structure={STRUCTURE}
      />
    </React.Fragment>
  );
}
