import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IElevatorController from '../../controllers/IControllers/IElevatorController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/elevators', route);

  const ctrl = Container.get(config.controllers.elevator.name) as IElevatorController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
        buildingId: Joi.string().required(),
        cordx: Joi.number().required(),
        cordy: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createElevator(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        floors: Joi.array()
          .items(Joi.string())
          .required(),
        buildingId: Joi.string().required(),
        cordx: Joi.number().required(),
        cordy: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updateElevator(req, res, next),
  );
  /*
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
*/
  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.listAllElevators(req, res, next));
  route.get('/getElevatorFloors/:id', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.findFloorsElevator(req, res, next));
  route.get('/getElevatorAlgav', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.getElevatorAlgav(req, res, next));
};
