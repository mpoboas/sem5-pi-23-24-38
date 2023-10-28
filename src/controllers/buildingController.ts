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

}
