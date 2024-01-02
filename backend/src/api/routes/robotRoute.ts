import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/robots', route);

  const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]),
    celebrate({
      body: Joi.object({
        nickname: Joi.string().required(),
        serialNr: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().required(),
        robotTypeId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createRobot(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        nickname: Joi.string().required(),
        serialNr: Joi.string().required(),
        description: Joi.string().required(),
        isActive: Joi.boolean().required(),
        robotTypeId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateRobot(req, res, next),
  );

  route.patch(
    '/:id',
    isAuth,
    authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]),
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        nickname: Joi.string(),
        serialNr: Joi.string(),
        description: Joi.string(),
        isActive: Joi.boolean(),
        robotTypeId: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.patchRobot(req, res, next),
  );

  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.FLEET_MANAGER]), (req, res, next) => ctrl.listAllRobots(req, res, next));
};
