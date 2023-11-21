import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createElevator(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        x: Joi.number().required(),
        y: Joi.number().required(),
        buildingId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next),
  );

  route.patch(
    '/:id',
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        x: Joi.number(),
        y: Joi.number(),
        buildingId: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.patchElevator(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.listAllElevators(req, res, next));
};
