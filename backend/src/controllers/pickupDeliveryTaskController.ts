import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPickupDeliveryTaskController from './IControllers/IPickupDeliveryTaskController';
import IPickupDeliveryTaskService from '../services/IServices/IPickupDeliveryTaskService';
import IPickupDeliveryTaskDTO from '../dto/IPickupDeliveryTaskDTO';

@Service()
export default class PickupDeliveryTaskController implements IPickupDeliveryTaskController {
    constructor(@Inject(config.services.pickupDeliveryTask.name) private taskServiceInstance: IPickupDeliveryTaskService) {}

    public async createPickupDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskDTO = req.body as IPickupDeliveryTaskDTO;
      
            const taskOrError = (await this.taskServiceInstance.createPickupDeliveryTask(taskDTO)) as Result<IPickupDeliveryTaskDTO>;
      
            if (taskOrError.isFailure) {
              return res.status(402).send();
            }
      
            const createdTaskDTO = taskOrError.getValue();
            return res.json(createdTaskDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updatePickupDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
          const taskDTO = req.body as IPickupDeliveryTaskDTO;

          const taskOrError = (await this.taskServiceInstance.updatePickupDeliveryTask(taskDTO)) as Result<IPickupDeliveryTaskDTO>;
    
          if (taskOrError.isFailure) {
            return res.status(404).send();
          }
    
          const createdTaskDTO = taskOrError.getValue();
          return res.status(201).json(createdTaskDTO);
        } catch (e) {
          return next(e);
        }
    }

    public async patchPickupDeliveryTask(req: Request, res: Response, next: NextFunction) {
        try {
          const taskId = req.params.id;
          const taskUpdate: IPickupDeliveryTaskDTO = req.body;
    
          //check if building exists
          const existingTask = await this.taskServiceInstance.getPickupDeliveryTask(taskId);
          if (!existingTask) {
            return res.status(404).send();
          }
          const updatedTask = await this.taskServiceInstance.patchPickupDeliveryTask(taskId, taskUpdate);
    
          return res.status(200).json(updatedTask);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllPickupDeliveryTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllPickupDeliveryTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllPendingPickupDeliveryTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllPendingPickupDeliveryTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllApprovedPickupDeliveryTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllApprovedPickupDeliveryTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }
}
