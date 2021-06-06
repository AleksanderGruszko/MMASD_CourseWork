import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Order} from '../../types/order.types';
import {DataTable} from '../../components/molecules/DataTable';
import {DataTableStructureItem} from '../../components/molecules/DataTable/dataTable.types';
import {getCargoTypeMeasureUnitsTranslation} from '../../utils/specificTranslations.utils';
import {ordersSlice} from '../../store/orders/orders.slice';
import OrdersForm from './parts/OrdersForm';

const ORDERS_TABLE_STRUCTURE: DataTableStructureItem[] = [
  {
    title: 'Cargo to delivery',
    renderCell: (item) => {
      const order = item as Order;
      const cargoUnits = getCargoTypeMeasureUnitsTranslation(order.cargoType);
      return `${order.cargoSize} ${cargoUnits}`
    },
  },
  {
    title: 'Origin',
    relatedFieldName: 'sourceCity',
  },
  {
    title: 'Destination',
    relatedFieldName: 'destinationCity',
  },
];

const IS_REMOVABLE_CHECK_MOCK = () => true;

export function OrdersPage () {
  const dispatch = useDispatch();

  const orders = useSelector(ordersSlice.selectors.getOrders);

  const handleRemoveItemClick = (uuid: string) => {
    const itemToRemove = orders.find((order) => (order.uuid === uuid));
    itemToRemove && dispatch(ordersSlice.actions.deleteOrder(itemToRemove));
  };

  useEffect(() => {
    dispatch(ordersSlice.actions.loadOrders());
  }, [dispatch]);

  return (
    <>
      <OrdersForm />
      <DataTable
        items={orders}
        uniqueFieldName={'uuid'}
        structure={ORDERS_TABLE_STRUCTURE}
        noDataString={'No orders presented. Please, add new one'}
        onRemoveItemClick={handleRemoveItemClick}
        isRemovableItem={IS_REMOVABLE_CHECK_MOCK}
      />
    </>
  )
}
