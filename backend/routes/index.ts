import express from 'express';
import applyOrderRoutes from './orders.routes';

export function combineRoutes (router: express.Router) {
  applyOrderRoutes(router);
}
