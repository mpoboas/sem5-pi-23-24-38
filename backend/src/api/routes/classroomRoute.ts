import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IClassroomController from '../../controllers/IControllers/IClassroomController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/classrooms', route);

  const ctrl = Container.get(config.controllers.classroom.name) as IClassroomController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        category: Joi.string(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        floorId: Joi.string().required(),
        cordx: Joi.number().required(),
        cordy: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createClassroom(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        category: Joi.string(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        floorId: Joi.string().required(),
        cordx: Joi.number().required(),
        cordy: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.updateClassroom(req, res, next),
  );

  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.listAllClassrooms(req, res, next));
  route.get('/getClassroomsAlgav', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.getClasssroomsAlgav(req, res, next));
  route.get('/getClassrooms/:floorId', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.listAllClassroomsInFloor(req, res, next));
};
