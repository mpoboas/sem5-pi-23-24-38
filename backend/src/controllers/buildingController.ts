import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IBuildingController from './IControllers/IBuildingController';
import IBuildingService from '../services/IServices/IBuildingService';
import IBuildingDTO from '../dto/IBuildingDTO';
import FloorDTO from '../dto/IFloorDTO';
import ClassroomDTO from '../dto/IClassroomDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class BuildingController implements IBuildingController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.building.name) private buildingServiceInstance: IBuildingService) {}

    public async createBuilding(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingDTO = req.body as IBuildingDTO;
            
            const buildingOrError = await this.buildingServiceInstance.createBuilding(buildingDTO);

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
            
            const buildingOrError = await this.buildingServiceInstance.updateBuilding(buildingDTO);

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

    /*public async loadFloors(req: Request, res: Response, next: NextFunction) {
        const { floors } = req.body;
        const buildingId = req.params.id;
        const buildingDTO = await this.buildingServiceInstance.getBuilding(buildingId);
        console.log('\x1b[31m%s\x1b[0m', '\nBuildingID: ' + buildingId);
        console.log('\x1b[31m%s\x1b[0m', '\nThe floors: ' + floors);
        let result = null;
        let createdFloorsIds: string[] = [];
    
        // Use Promise.all to await all the async operations
        const floorDTOs: FloorDTO[] = await Promise.all(floors.map(async (floor: any) => {
            const { id, floorNumber, description, length, width, classrooms } = floor;
            console.log('\x1b[31m%s\x1b[0m', '\nCurrent floor: ' + id);
    
            const classroomDTOs: ClassroomDTO[] = await Promise.all(classrooms.map(async (classroom: any) => {
                const { id, name, description, category, length, width } = classroom;
                console.log('\x1b[32m%s\x1b[0m', '\nCurrent classroom: ' + id);
    
                // Create a ClassroomDTO here or return the necessary data.
                const classroomDTO: ClassroomDTO = {
                    id,
                    name,
                    description,
                    category,
                    length,
                    width,
                };
                return classroomDTO;
            }));
            
            result = await this.buildingServiceInstance.loadFloors(buildingId, floor, classroomDTOs);
            console.log('\x1b[32m%s\x1b[0m', '\nResult: ' + result);
            createdFloorsIds.push(result.getValue().id);
        }));
    
        const buildingOrError = await this.buildingServiceInstance.updateBuilding(buildingDTO, createdFloorsIds);
    
        if (buildingOrError.isSuccess) {
            res.status(200).json({ message: 'Floors loaded successfully' });
        } else {
            res.status(400).json({ error: buildingOrError.error });
        }
    }*/
    
    public async listAllBuildings(req: Request, res: Response, next: NextFunction) {
        try {
            const buildings = await this.buildingServiceInstance.getAllBuildings();
            return res.json(buildings).status(200);
        } catch (e) {
            return next(e);
        }
    }

    public async findBuildingByDomainId(req: Request, res: Response, next: NextFunction) {
        try {
            const domainId = req.params.id;
            const building = await this.buildingServiceInstance.getBuilding(domainId);

            if (building.isFailure) {
                return res.status(500).json(building.error);
            }

            return res.json(building.getValue()).status(200);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    public async findBuildingByCode(req: Request, res: Response, next: NextFunction) {
        try {
            const code = req.params.code;
            const building = await this.buildingServiceInstance.findByCode(code);

            if (building.isFailure) {
                return res.status(500).json(building.error);
            }

            return res.json(building.getValue()).status(200);
        } catch (e) {
            return res.status(500).json(e.message);
        }
    }

    public async findBuildingByMinMaxFloors(req: Request, res: Response, next: NextFunction) {
        try {
          const range = req.params.range;
          const splitrange = range.split('-');
          const minFloors = Number(splitrange[0]);
          const maxFloors = Number(splitrange[1]);
    
          if(minFloors > maxFloors) {
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
    public async findBuildingCode(req: Request, res: Response, next: NextFunction) {
        try {
            const buildingId = req.params.buildingId;
            const building = await this.buildingServiceInstance.getBuilding(buildingId);
            if (building.isFailure) {
                //500- The server has encountered a situation it does not know how to handle
                return res.status(500).json(building.error);
              }
            return res.json(building.getValue().code).status(200);
        } catch (e) {
            console.log('Error in BuildingController.findBuildingCode(): ', e);
          return next(e);
        }
    }

    /*public async listAllFloors(req: Request, res: Response, next: NextFunction) {
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
    }*/

}
