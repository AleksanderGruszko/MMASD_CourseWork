import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {City} from '../../types/city.types';
import {DataTableItem, DataTableStructureItem} from '../../components/molecules/DataTable/dataTable.types';
import {citiesSlice} from '../../store/cities/cities.slice';
import {DataTable} from '../../components/molecules/DataTable';

function getTableStructure (citiesHash: Record<string, City>): DataTableStructureItem[] {
  const cityIds = Object.keys(citiesHash);
  return [
    {
      title: '',
      relatedFieldName: 'title',
    },
    ...cityIds.map((cityId, index) => ({
      title: citiesHash[cityId].title,
      renderCell: (item: DataTableItem) => {
        const city = item as City;
        return city.distances[cityIds[index]]
      }
    }))
  ];
}

export function CitiesListPage () {
  const cities = useSelector(citiesSlice.selectors.getCities);
  const citiesHash = useSelector(citiesSlice.selectors.getCitiesHash);

  const tableStructure = useMemo(() => {
    return getTableStructure(citiesHash);
  }, [cities]);

  return (
    <DataTable
      items={cities}
      uniqueFieldName={'uuid'}
      structure={tableStructure}
      isAbleToAdd={false}
    />
  )
}
