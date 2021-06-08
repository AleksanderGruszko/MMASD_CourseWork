import express from 'express';
import {ordersModel} from '../models/orders.model';
import {makeResponse} from '../utils/makeResponse';

export default function applyOrderRoutes (router: express.Router) {
  router.post('/orders', async (req, res) => {
    const created = await ordersModel.create(req.body);
    res.send(makeResponse(created));
  });

  router.get('/orders', async (req, res) => {
    const orders = await ordersModel.find({});
    res.send(makeResponse(orders));
  });

  router.put('/orders/:orderId', async (req, res) => {
    const {uuid, ...orderToUpdate} = req.body
    const { orderId } = req.params;
    const updated = await ordersModel.findByIdAndUpdate(orderId, orderToUpdate);
    res.send(updated !== null ? makeResponse(updated) : null);
  });

  router.delete('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    await ordersModel.findByIdAndDelete(orderId);
    res.send('');
  });
}
