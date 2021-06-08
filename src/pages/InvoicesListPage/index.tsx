import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Typography, Box} from '@material-ui/core';
import {citiesSlice} from '../../store/cities/cities.slice';
import {vehiclesSlice} from '../../store/vehicles/vehicles.slice';
import {ordersSlice} from '../../store/orders/orders.slice';
import helpers from './helpers';
import {makeHashForEntity} from '../../utils/makeHashForEntity.util';
import {DataTable} from '../../components/molecules/DataTable';
import {Order} from '../../types/order.types';
import {City} from '../../types/city.types';
import {DeclinedOrder, Invoice} from '../../types/invoice.types';
import {DataTableStructureItem} from '../../components/molecules/DataTable/dataTable.types';
import {getDistance} from '../../utils/getDistance.util';
import {getCargoTypeMeasureUnitsTranslation} from '../../utils/specificTranslations.utils';
import {Vehicle} from '../../types/vehicle.types';

function makeInvoicesTableStructure (
  citiesHash: Record<string, City>,
  vehiclesHash: Record<string, Vehicle>,
): DataTableStructureItem[] {
  return [
    {
      title: 'Origin city',
      renderCell: (item) => {
        const invoice = item as Invoice;
        return citiesHash[invoice.order.sourceCity].title;
      },
    },
    {
      title: 'Destination city',
      renderCell: (item) => {
        const invoice = item as Invoice;
        return citiesHash[invoice.order.destinationCity].title;
      },
    },
    {
      title: 'Cargo size',
      renderCell: (item) => {
        const invoice = item as Invoice;
        const {order: {cargoSize, cargoType}} = invoice;
        return `${cargoSize} ${getCargoTypeMeasureUnitsTranslation(cargoType)}`;
      },
    },
    {
      title: 'Total price',
      renderCell: (item) => {
        const invoice = item as Invoice;
        return invoice.totalPrice.toFixed(2);
      },
    },
    {
      title: 'Distance',
      renderCell: (item) => {
        const invoice = item as Invoice;
        const {order} = invoice;
        const {sourceCity, destinationCity} = order;
        const distance = getDistance(citiesHash[sourceCity], citiesHash[destinationCity]);
        return `${distance}km`;
      },
    },
    {
      title: 'Vehicle details',
      renderCell: (item) => {
        const invoice = item as Invoice;
        return (
          <table>
            <thead>
              <tr>
                <th>Truck</th>
                <th style={{padding: '0 10px'}}>Cargo</th>
                <th>Part</th>
              </tr>
            </thead>
            <tbody>
            {invoice.cargoChunks.map((chunk) => {
              const vehicle = vehiclesHash[chunk.vehicleUuid];
              return (
                <tr key={vehicle.uuid}>
                  <td>
                    {vehicle.title}
                  </td>
                  <td style={{padding: '0 10px'}}>
                    {chunk.cargoSize} {getCargoTypeMeasureUnitsTranslation(vehicle.cargoType)}
                  </td>
                  <td>
                    {chunk.cargoSize / vehicle.cargoSize}
                  </td>
                </tr>
              );
            })}
            </tbody>
          </table>
        );
      }
    }
  ]
}

function makeDeclinedOrdersTableStructure (
  citiesHash: Record<string, City>,
  ordersHash: Record<string, Order>
): DataTableStructureItem[] {
  return [
    {
      title: 'Origin city',
      renderCell: (item) => {
        const declined = item as DeclinedOrder;
        const order = ordersHash[declined.orderUuid];
        return citiesHash[order.sourceCity].title;
      },
    },
    {
      title: 'Destination city',
      renderCell: (item) => {
        const declined = item as DeclinedOrder;
        const order = ordersHash[declined.orderUuid];
        return citiesHash[order.destinationCity].title;
      },
    },
    {
      title: 'Cargo size',
      renderCell: (item) => {
        const declined = item as DeclinedOrder;
        const order = ordersHash[declined.orderUuid];
        return `${order.cargoSize} ${getCargoTypeMeasureUnitsTranslation(order.cargoType)}`;
      },
    },
    {
      title: 'Reason of decline',
      relatedFieldName: 'reasonOfDecline',
    }
  ];
}

export function InvoicesListPage () {
  const dispatch = useDispatch();
  const citiesHash = useSelector(citiesSlice.selectors.getCitiesHash);
  const cities = useSelector(citiesSlice.selectors.getCities);
  const vehicles = useSelector(vehiclesSlice.selectors.getVehicles);
  const orders = useSelector(ordersSlice.selectors.getOrders);

  useEffect(() => {
    dispatch(vehiclesSlice.actions.loadVehicles());
    dispatch(ordersSlice.actions.loadOrders());
  }, []);

  const computed = useMemo(() => {
    return helpers.makeInvoices(cities, orders, vehicles);
  }, [cities, ordersSlice,  vehicles]);

  const ordersHash = useMemo(() => {
    return makeHashForEntity<Order>(orders);
  }, [orders]);

  const vehiclesHash = useMemo(() => {
    return makeHashForEntity<Vehicle>(vehicles);
  }, [vehicles]);

  const invoicesStructure = useMemo(() => {
    return makeInvoicesTableStructure(citiesHash, vehiclesHash);
  }, [citiesHash, vehiclesHash]);

  const declinedStructure = useMemo(() => {
    return makeDeclinedOrdersTableStructure(citiesHash, ordersHash);
  }, [citiesHash, ordersHash]);

  if (computed === null) {
    return null;
  }
  const {invoices, declined} = computed;

  return (
    <div>
      {invoices.length && (
        <>
          <Box mb={2}>
            <Typography variant={'h5'}>Processed orders [{invoices.length}]</Typography>
          </Box>
          <DataTable
            items={invoices}
            uniqueFieldName={'uuid'}
            structure={invoicesStructure}
            isAbleToAdd={false}
          />
        </>
      )}
      {declined.length && (
        <>
          <Box mb={2}>
            <Typography variant={'h5'}>Not processed orders [{declined.length}]</Typography>
          </Box>
          <DataTable
            items={declined}
            uniqueFieldName={'orderUuid'}
            structure={declinedStructure}
            isAbleToAdd={false}
          />
        </>
      )}
    </div>
  )
}
