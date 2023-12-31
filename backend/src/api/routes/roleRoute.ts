import { Router } from 'express';

import { Container } from 'typedi';
import IRoleController from '../../controllers/IControllers/IRoleController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/roles', route);

  const ctrl = Container.get(config.controllers.role.name) as IRoleController;

  route.get('', (req, res, next) => ctrl.getAllRoles(req, res, next));
  
};
