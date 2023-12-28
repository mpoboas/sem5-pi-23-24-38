import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';
import {Role} from '../../domain/role/role';

import config from '../../../config';
import { rolesArray } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.get('', (req, res, next) => ctrl.getAllRoles(req, res, next));
  
};
