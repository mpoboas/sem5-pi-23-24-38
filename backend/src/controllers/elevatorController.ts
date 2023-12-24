import { Inject, Service } from 'typedi';
import config from '../../config';
import IElevatorService from '../services/IServices/IElevatorService';
import IElevatorController from './IControllers/IElevatorController';
import { Request, Response, NextFunction } from 'express';
import IElevatorDTO from '../dto/IElevatorDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class ElevatorController
  implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService) {}

  public async createElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;
      if (elevatorOrError.isFailure) {
        return res.status(402).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.json(elevatorDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorOrError = (await this.elevatorServiceInstance.updateElevator(req.body as IElevatorDTO)) as Result<
        IElevatorDTO
      >;

      if (elevatorOrError.isFailure) {
        return res.status(404).send();
      }

      const elevatorDTO = elevatorOrError.getValue();
      return res.status(201).json(elevatorDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async patchElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorId = req.params.id;
      const elevatorUpdate: IElevatorDTO = req.body;

      //check if building exists
      const existingElevator = await this.elevatorServiceInstance.getElevator(elevatorId);
      if (!existingElevator) {
        return res.status(404).send();
      }
      const updatedElevator = await this.elevatorServiceInstance.patchElevator(elevatorId, elevatorUpdate);

      return res.status(200).json(updatedElevator);
    } catch (e) {
      return next(e);
    }
  }

  public async listAllElevators(req: Request, res: Response, next: NextFunction) {
    try {
      //console.log('listAllElevators');
      const elevators = await this.elevatorServiceInstance.getAllElevators();
      console.log('listAllElevators', elevators);
      return res.json(elevators).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async findFloorsElevator(req: Request, res: Response, next: NextFunction) {
    try {
      const elevatorId = req.params.id;
      const floors = await this.elevatorServiceInstance.findFloorsElevator(elevatorId);
      return res.status(200).json(floors);
    } catch (e) {
      return next(e);
    }
  }

  public async getElevatorAlgav(req: Request, res: Response, next: NextFunction) {
    try {
      const elevators = await this.elevatorServiceInstance.getElevatorAlgav();
      return res.json(elevators.getValue()).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
