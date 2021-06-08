import express from 'express';
import applyOrderRoutes from './orders.routes';
import applyCitiesRoutes from './cities.routes';
import applyVehicleRoutes from './vehicles.routes';

export function combineRoutes (router: express.Router) {
  applyCitiesRoutes(router);
  applyOrderRoutes(router);
  applyVehicleRoutes(router);
}
