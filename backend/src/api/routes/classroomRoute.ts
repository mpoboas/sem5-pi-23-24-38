import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IClassroomController from '../../controllers/IControllers/IClassroomController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/classrooms', route);

  const ctrl = Container.get(config.controllers.classroom.name) as IClassroomController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        category: Joi.string(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        floorId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createClassroom(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string(),
        category: Joi.string(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        floorId: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateClassroom(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.listAllClassrooms(req, res, next));
};
