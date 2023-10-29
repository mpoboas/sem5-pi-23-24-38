import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.building.name) private buildingServiceInstance: IBuildingService) {}

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingDTO = req.body as IBuildingDTO;
            const floorIds = req.body.floors as string[];
            
            const buildingOrError = await this.buildingServiceInstance.createBuilding(buildingDTO, floorIds);

            if (buildingOrError.isFailure) {
                return res.status(402).send();
            }

            const createdBuildingDTO = buildingOrError.getValue(); // Rename the variable

            return res.json(createdBuildingDTO).status(201); // Rename the variable
        } catch (e) {
            return next(e);
        }
    }

    public async updateBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingDTO = req.body as IBuildingDTO;
            const floorIds = req.body.floors as string[]; // Add this line to extract floorIds
            
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(buildingDTO, floorIds);

            if (buildingOrError.isFailure) {
                return res.status(404).send();
            }

            const updatedBuildingDTO = buildingOrError.getValue(); // Rename the variable

            return res.status(201).json(updatedBuildingDTO); // Rename the variable
        } catch (e) {
            return next(e);
        }
    }

    public async patchBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingId = req.params.id;
            const buildingUpdate: IBuildingDTO = req.body;
    
            //check if building exists
            const existingBuilding = await this.buildingServiceInstance.getBuilding(buildingId);
            if (!existingBuilding) {
                return res.status(404).send();
            }
            const updatedBuilding = await this.buildingServiceInstance.patchBuilding(buildingId, buildingUpdate);
    
            return res.status(200).json(updatedBuilding);
        } catch (e) {
            return next(e);
        }
    }
    
    public async listAllBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const buildings = await this.buildingServiceInstance.getAllBuildings();
            return res.json(buildings).status(200);
        } catch (e) {
            return next(e);
        }
    }

    public async findBuildingByMinMaxFloors(req: Request, res: Response, next: NextFunction) {
        try {
          const range = req.params.range;
          const splitrange = range.split('-');
          const minFloors = Number(splitrange[0]);
          const maxFloors = Number(splitrange[1]);
    
          if(minFloors > maxFloors) {
            console.log("minFloors must be less than maxFloors");
            //400 -bad request (due to client error)
            return res.status(400).json("minFloors must be less than maxFloors");
          }
    
          const buildings = await this.buildingServiceInstance.findBuildingByMinMaxFloors(minFloors, maxFloors);
    
          if (buildings.isFailure) {
            //500- The server has encountered a situation it does not know how to handle
            return res.status(500).json(buildings.error);
          }
    
          return res.json(buildings.getValue()).status(200);
        } catch (e) {
          console.log('Error in BuildingController.findByMinMaxFloors(): ', e);
          return next(e);
        }
      }

      public async listAllFloors(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingId = req.params.id;
            const floors = await this.buildingServiceInstance.getAllFloors(buildingId);
            if (floors.isFailure) {
                //500- The server has encountered a situation it does not know how to handle
                return res.status(500).json(floors.error);
              }
            return res.json(floors.getValue()).status(200);
        } catch (e) {
            console.log('Error in BuildingController.listAllFloors(): ', e);
          return next(e);
        }
    }

}
