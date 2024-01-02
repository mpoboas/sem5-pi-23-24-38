import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/buildings', route);

  const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

  route.post(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        letter: Joi.string().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        description: Joi.string(),
        code: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createBuilding(req, res, next),
  );

  route.put(
    '',
    isAuth,
    authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]),
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        letter: Joi.string().required(),
        length: Joi.number().required(),
        width: Joi.number().required(),
        description: Joi.string(),
        code: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateBuilding(req, res, next),
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
        letter: Joi.string(),
        length: Joi.number(),
        width: Joi.number(),
        description: Joi.string(),
        code: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.patchBuilding(req, res, next),
  );

  route.get('/byId/:id', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.findBuildingByDomainId(req, res, next));

  route.get('/byCode/:code', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.findBuildingByCode(req, res, next));

  route.get('', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.listAllBuildings(req, res, next));

  route.get('/floorRange/:range', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.findBuildingByMinMaxFloors(req, res, next));

  route.get('/getBuildingCode/:buildingId', isAuth, authorizeRole([Role.ADMIN, Role.CAMPUS_MANAGER]), (req, res, next) => ctrl.findBuildingCode(req, res, next));
};
