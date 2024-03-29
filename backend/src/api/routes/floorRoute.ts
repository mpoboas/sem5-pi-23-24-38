import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/floors', route);

  const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        floorNumber: Joi.string().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        description: Joi.string().required(),
        buildingId: Joi.string().required(),
        map: Joi.string().required(),
        json: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createFloor(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        floorNumber: Joi.string().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        description: Joi.string().required(),
        buildingId: Joi.string().required(),
        map: Joi.string().required(),
        json: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateFloor(req, res, next),
  );

  route.patch(
    '/:id',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      params: Joi.object({
        id: Joi.string().required(),
      }),
      body: Joi.object({
        floorNumber: Joi.string(),
        length: Joi.number(),
        width: Joi.number(),
        description: Joi.string(),
        buildingId: Joi.string(),
        map: Joi.string(),
        json: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.patchFloor(req, res, next),
  );

  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER, Role.TEACHER, Role.STUDENT, Role.USER]), (req, res, next) => ctrl.listAllFloors(req, res, next));

  route.get('/getFloors/:buildingId', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER, Role.TEACHER, Role.STUDENT, Role.USER]), (req, res, next) => ctrl.listAllFloorsInBuilding(req, res, next));

  route.get('/byNumber/:floorNumber', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER, Role.TEACHER, Role.STUDENT, Role.USER]), (req, res, next) => ctrl.findFloorByNumber(req, res, next));

  route.get('/getFloorNum/:id', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER, Role.TEACHER, Role.STUDENT, Role.USER]), (req, res, next) => ctrl.findFloorNum(req, res, next));
 
  route.get('/getAlgavInfo', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.getAlgavInfo(req, res, next));
};
