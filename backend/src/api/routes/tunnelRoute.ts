import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITunnelController from '../../controllers/IControllers/ITunnelController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/tunnels', route);

  const ctrl = Container.get(config.controllers.tunnel.name) as ITunnelController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        description: Joi.string().required(),
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required(),
        location1: Joi.array().items(Joi.number()),
        location2: Joi.array().items(Joi.number()),

      }),
    }),
    (req, res, next) => ctrl.createTunnel(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        description: Joi.string().required(),
        floor1Id: Joi.string().required(),
        floor2Id: Joi.string().required(),
        location1: Joi.array().items(Joi.number()),
        location2: Joi.array().items(Joi.number()),
        
      }),
    }),
    (req, res, next) => ctrl.updateTunnel(req, res, next),
  );

  route.patch(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        description: Joi.string(),
        floor1Id: Joi.string(),
        floor2Id: Joi.string(),
        location1: Joi.array().items(Joi.number()),
        location2: Joi.array().items(Joi.number()),

      }),
    }),
    (req, res, next) => ctrl.patchTunnel(req, res, next),
  );

  route.get('/getFloorsTunnel', (req, res, next) => ctrl.listAllTunnels(req, res, next));
  route.get('', (req, res, next) => ctrl.listTunnels2B(req, res, next));
  route.get('/getTunnelsAlgav', (req, res, next) => ctrl.getTunnelsAlgav(req, res, next));
  route.get('/getTunnelsAlgav2', (req, res, next) => ctrl.getTunnelsAlgav2(req, res, next));
};
