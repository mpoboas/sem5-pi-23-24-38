import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IRobotTypeController from './IControllers/IRobotTypeController';
import IRobotTypeService from '../services/IServices/IRobotTypeService';
import IRobotTypeDTO from '../dto/IRobotTypeDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class RobotTypeController
  implements IRobotTypeController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.robotType.name) private robotTypeServiceInstance: IRobotTypeService) {}

  public async createRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = (await this.robotTypeServiceInstance.createRobotType(
        req.body as IRobotTypeDTO,
      )) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        return res.status(402).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.json(robotTypeDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateRobotType(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeOrError = (await this.robotTypeServiceInstance.updateRobotType(
        req.body as IRobotTypeDTO,
      )) as Result<IRobotTypeDTO>;

      if (robotTypeOrError.isFailure) {
        return res.status(404).send();
      }

      const robotTypeDTO = robotTypeOrError.getValue();
      return res.status(201).json(robotTypeDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async listAllRobotTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypes = await this.robotTypeServiceInstance.getAllRobotTypes();
      return res.json(robotTypes).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async findRobotTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      const robotTypeId = req.params.id;
      const robotType = await this.robotTypeServiceInstance.getRobotType(robotTypeId);
      return res.json(robotType.getValue()).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
