import express from 'express';
import {citiesModel} from '../models/cities.model';
import {makeResponse} from '../utils/makeResponse';

export default function applyCitiesRoutes (router: express.Router) {
  router.get('/cities', async (req, res) => {
    const cities = await citiesModel.find({});
    res.send(makeResponse(cities));
  });
}
