import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import ISurveillanceTaskController from './IControllers/ISurveillanceTaskController';
import ISurveillanceTaskService from '../services/IServices/ISurveillanceTaskService';
import ISurveillanceTaskDTO from '../dto/ISurveillanceTaskDTO';

@Service()
export default class SurveillanceTaskController implements ISurveillanceTaskController {
    constructor(@Inject(config.services.surveillanceTask.name) private taskServiceInstance: ISurveillanceTaskService) {}

    public async createSurveillanceTask(req: Request, res: Response, next: NextFunction) {
        try {
            const taskDTO = req.body as ISurveillanceTaskDTO;
      
            const taskOrError = (await this.taskServiceInstance.createSurveillanceTask(taskDTO)) as Result<ISurveillanceTaskDTO>;
      
            if (taskOrError.isFailure) {
              return res.status(402).send();
            }
      
            const createdTaskDTO = taskOrError.getValue();
            return res.json(createdTaskDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updateSurveillanceTask(req: Request, res: Response, next: NextFunction) {
        try {
          const taskDTO = req.body as ISurveillanceTaskDTO;

          const taskOrError = (await this.taskServiceInstance.updateSurveillanceTask(taskDTO)) as Result<ISurveillanceTaskDTO>;
    
          if (taskOrError.isFailure) {
            return res.status(404).send();
          }
    
          const createdTaskDTO = taskOrError.getValue();
          return res.status(201).json(createdTaskDTO);
        } catch (e) {
          return next(e);
        }
    }

    public async patchSurveillanceTask(req: Request, res: Response, next: NextFunction) {
        try {
          const taskId = req.params.id;
          const taskUpdate: ISurveillanceTaskDTO = req.body;
    
          //check if building exists
          const existingTask = await this.taskServiceInstance.getSurveillanceTask(taskId);
          if (!existingTask) {
            return res.status(404).send();
          }
          const updatedTask = await this.taskServiceInstance.patchSurveillanceTask(taskId, taskUpdate);
    
          return res.status(200).json(updatedTask);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllSurveillanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllSurveillanceTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllPendingSurveillanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllPendingSurveillanceTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }

    public async listAllApprovedSurveillanceTasks(req: Request, res: Response, next: NextFunction) {
        try {
          const tasks = await this.taskServiceInstance.getAllApprovedSurveillanceTasks();
          return res.status(200).json(tasks);
        } catch (e) {
          return next(e);
        }
    }
}
