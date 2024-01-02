import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotTypeController from '../../controllers/IControllers/IRobotTypeController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/robot-types', route);

  const ctrl = Container.get(config.controllers.robotType.name) as IRobotTypeController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]),
    celebrate({
      body: Joi.object({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        tasks: Joi.array().items(Joi.string()),
        designation: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRobotType(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        brand: Joi.string().required(),
        model: Joi.string().required(),
        tasks: Joi.array().items(Joi.string()),
        designation: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRobotType(req, res, next),
  );

  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]), (req, res, next) => ctrl.listAllRobotTypes(req, res, next));
  route.get('/byId/:id', isAuth, authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]), (req, res, next) => ctrl.findRobotTypeById(req, res, next));
};
