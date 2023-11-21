import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/robot-types', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        tasks: Joi.array().items(Joi.string()),
      }),
    }),
    (req, res, next) => ctrl.createRobotType(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        tasks: Joi.array().items(Joi.string()),
      }),
    }),
    (req, res, next) => ctrl.updateRobotType(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.listAllRobotTypes(req, res, next));
};
