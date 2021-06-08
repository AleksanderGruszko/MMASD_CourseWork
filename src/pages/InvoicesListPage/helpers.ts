import {City} from '../../types/city.types';
import {Order} from '../../types/order.types';
import {Vehicle} from '../../types/vehicle.types';
import {Invoice, CargoChunk, DeclinedOrder} from '../../types/invoice.types';
import {makeHashForEntity} from '../../utils/makeHashForEntity.util';

type ExtendedVehicle = Vehicle & {
  leftCapacity: number;
  reservedDestination: string | null;
};

type Calculated = {
  invoices: Invoice[],
  declined: DeclinedOrder[],
} | null;

function makeExtendedVehicles (vehicles: Vehicle[]): ExtendedVehicle[] {
  return vehicles.map((vehicle) => {
    return {
      ...vehicle,
      leftCapacity: vehicle.cargoSize,
      reservedDestination: null,
    };
  })
}

const fleetHelpers = {
  getGrantedFleet (order: Order, vehicles: ExtendedVehicle[]): ExtendedVehicle[] {
    const {sourceCity, cargoType} = order;
    return vehicles.filter((vehicle) => {
      return vehicle.cargoType === cargoType
        && vehicle.currentCity === sourceCity
        && vehicle.leftCapacity > 0
        && (vehicle.reservedDestination === null || vehicle.reservedDestination === order.destinationCity)
    });
  },

  makeReservedCargoChunks (order: Order, vehicles: ExtendedVehicle[]): CargoChunk[] {
    let leftCargoSize = order.cargoSize;
    let vehicleIndex = 0;
    const cargoChunks: CargoChunk[] = [];
    while (leftCargoSize > 0) {
      const vehicleToLoad = vehicles[vehicleIndex];
      if (!vehicleToLoad) {
        return [];
      }
      const cargoToLoad = Math.min(leftCargoSize, vehicleToLoad.leftCapacity);
      leftCargoSize -= cargoToLoad;
      cargoChunks.push({
        orderUuid: order.uuid,
        vehicleUuid: vehicleToLoad.uuid,
        cargoSize: cargoToLoad,
      });
      vehicleIndex++;
    }
    return cargoChunks;
  },

  loadFleetWithReservedChunks (
    order: Order,
    vehiclesHash: Record<string, ExtendedVehicle>,
    cargoChunks: CargoChunk[]
  ): void {
    cargoChunks.forEach((cargoChunk) => {
      const vehicleToLoad = vehiclesHash[cargoChunk.vehicleUuid];
      vehicleToLoad.reservedDestination = order.destinationCity;
      vehicleToLoad.leftCapacity -= cargoChunk.cargoSize;
    });
  },
};

const logisticHelpers = {
  getTransportationPrice: (
    order: Order,
    cargoChunks: CargoChunk[],
    vehiclesHash: Record<string, ExtendedVehicle>,
    citiesHash: Record<string, City>
  ): number => {
    let totalPrice = 0;
    const orderDistance = citiesHash[order.sourceCity].distances[order.destinationCity];
    cargoChunks.forEach((cargoChunk) => {
      const {cargoSize, vehicleUuid} = cargoChunk;
      const vehicle = vehiclesHash[vehicleUuid];
      const grantedCargoPart = cargoSize / vehicle.cargoSize;
      const fullDistancePrice = orderDistance * vehicle.pricePerKm;
      totalPrice += grantedCargoPart * fullDistancePrice;
    });
    return totalPrice;
  },
};

const helpers = {
  makeInvoices (
    cities: City[],
    orders: Order[],
    vehicles: Vehicle[],
  ): Calculated {
    if (!cities.length || !orders.length || !vehicles.length) {
      return null;
    }
    const extendedVehicles = makeExtendedVehicles(vehicles);
    const cityHash = makeHashForEntity<City>(cities);
    const declined: DeclinedOrder[] = [];
    const invoices: Invoice[] = [];

    orders.forEach((order) => {
      const refuseOrder = (reason: string) => {
        declined.push({reasonOfDecline: reason, orderUuid: order.uuid});
      }

      const grantedFleet = fleetHelpers.getGrantedFleet(order, extendedVehicles);
      if (grantedFleet.length === 0) {
        return refuseOrder('No vehicles to reserve, according to another orders');
      }
      const reservedCargoChunks = fleetHelpers.makeReservedCargoChunks(order, grantedFleet);
      if (reservedCargoChunks.length === 0) {
        return refuseOrder('Not enough vehicles at origin city');
      }
      const grantedVehiclesHash = makeHashForEntity<ExtendedVehicle>(grantedFleet);
      fleetHelpers.loadFleetWithReservedChunks(order, grantedVehiclesHash, reservedCargoChunks);
      const totalPrice = logisticHelpers.getTransportationPrice(
        order,
        reservedCargoChunks,
        grantedVehiclesHash,
        cityHash
      );
      invoices.push({
        uuid: order.uuid,
        order,
        cargoChunks: reservedCargoChunks,
        totalPrice,
      });
    });

    return {
      invoices,
      declined,
    };
  }
};

export default helpers;
