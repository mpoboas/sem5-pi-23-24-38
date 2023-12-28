import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IRoleController from './IControllers/IRoleController';
import IRoleService from '../services/IServices/IRoleService';
import IRoleDTO from '../dto/IRoleDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class RoleController implements IRoleController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.role.name) private roleServiceInstance: IRoleService) {}

  public async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const roles = await this.roleServiceInstance.getAllRoles();
      return res.status(200).json(roles);
    } catch (e) {
      return next(e);
    }
  }
}
