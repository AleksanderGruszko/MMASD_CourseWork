import express from 'express';
import {vehiclesModel} from '../models/vehicles.model';
import {makeResponse} from '../utils/makeResponse';

export default function applyVehicleRoutes (router: express.Router) {
  router.post('/vehicles', async (req, res) => {
    const created = await vehiclesModel.create(req.body);
    res.send(makeResponse(created));
  });

  router.get('/vehicles', async (req, res) => {
    const orders = await vehiclesModel.find({});
    res.send(makeResponse(orders));
  });

  router.put('/vehicles/:vehicleId', async (req, res) => {
    const {uuid, ...vehicle} = req.body
    const { vehicleId } = req.params;
    const updated = await vehiclesModel.findByIdAndUpdate(vehicleId, vehicle, {new: true});
    res.send(updated !== null ? makeResponse(updated) : null);
  });

  router.delete('/vehicles/:vehicleId', async (req, res) => {
    const { vehicleId } = req.params;
    await vehiclesModel.findByIdAndDelete(vehicleId);
    res.send('');
  });
}
