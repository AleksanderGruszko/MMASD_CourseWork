import React, {useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Order, RawOrder} from '../../types/order.types';
import {DataTable} from '../../components/molecules/DataTable';
import {DataTableStructureItem} from '../../components/molecules/DataTable/dataTable.types';
import {getCargoTypeMeasureUnitsTranslation} from '../../utils/specificTranslations.utils';
import {ordersSlice} from '../../store/orders/orders.slice';
import OrdersForm from './parts/OrdersForm';
import {citiesSlice} from '../../store/cities/cities.slice';
import {City} from '../../types/city.types';

function getTableStructure (citiesHash: Record<string, City>): DataTableStructureItem[] {
  return [
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
      renderCell: (item) => (
        citiesHash[item.sourceCity] && citiesHash[item.sourceCity].title
      ),
    },
    {
      title: 'Destination',
      renderCell: (item) => (
        citiesHash[item.destinationCity] && citiesHash[item.destinationCity].title
      ),
    },
  ];
}

enum FORM_MODES {
  REST = 'rest',
  EDIT = 'edit',
  ADD = 'add',
}

const IS_REMOVABLE_CHECK_MOCK = () => true;
const IS_EDITABLE_CHECK_MOCK = () => true;

export function OrdersPage () {
  const dispatch = useDispatch();
  const orders = useSelector(ordersSlice.selectors.getOrders);
  const citiesHash = useSelector(citiesSlice.selectors.getCitiesHash);
  const [orderToEdit, setOrderToEdit] = useState<Order | Partial<RawOrder> | null>(null);
  const [mode, setMode] = useState(FORM_MODES.REST);

  const tableStructure = useMemo(() => {
    return getTableStructure(citiesHash);
  }, [citiesHash]);

  const handleEditItemClick = (uuid: string) => {
    const orderToEdit = orders.find((order) => (order.uuid === uuid));
    setMode(FORM_MODES.EDIT);
    setOrderToEdit(orderToEdit as Order);
  };

  const handleAddItemClick = () => {
    setMode(FORM_MODES.ADD);
    setOrderToEdit({});
  };

  const handleRemoveItemClick = (uuid: string) => {
    const itemToRemove = orders.find((order) => (order.uuid === uuid));
    itemToRemove && dispatch(ordersSlice.actions.deleteOrder(itemToRemove));
    if (orderToEdit !== null && 'uuid' in orderToEdit && orderToEdit.uuid === uuid) {
      setOrderToEdit(null);
      setMode(FORM_MODES.REST);
    }
  };

  const handleFormSubmit = async (order: Order | RawOrder) => {
    if (mode === FORM_MODES.EDIT) {
      await dispatch(ordersSlice.actions.editOrder(order as Order));
    }
    if (mode === FORM_MODES.ADD) {
      await dispatch(ordersSlice.actions.addOrder(order as RawOrder));
    }
    setOrderToEdit(null);
    setMode(FORM_MODES.REST);
  };

  useEffect(() => {
    dispatch(ordersSlice.actions.loadOrders());
  }, [dispatch]);

  return (
    <>
      {mode !== FORM_MODES.REST && orderToEdit !== null && (
        <OrdersForm
          order={orderToEdit}
          onSubmit={handleFormSubmit}
        />
      )}
      <DataTable
        items={orders}
        uniqueFieldName={'uuid'}
        structure={tableStructure}
        noDataString={'No orders presented. Please, add new one'}
        onRemoveItemClick={handleRemoveItemClick}
        isRemovableItem={IS_REMOVABLE_CHECK_MOCK}
        onEditItemClick={handleEditItemClick}
        isEditableItem={IS_EDITABLE_CHECK_MOCK}
        onAddItemClick={handleAddItemClick}
      />
    </>
  )
}
