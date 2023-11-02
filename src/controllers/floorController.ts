
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IFloorController from './IControllers/IFloorController';
import IFloorService from '../services/IServices/IFloorService';
import IFloorDTO from '../dto/IFloorDTO';
import { Result } from '../core/logic/Result';

@Service()
export default class FloorController implements IFloorController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.floor.name) private floorServiceInstance: IFloorService) {}

    public async createFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorDTO = req.body as IFloorDTO;

            const floorOrError = (await this.floorServiceInstance.createFloor(floorDTO)) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(402).send();
            }

            const createdFloorDTO = floorOrError.getValue();
            return res.json(createdFloorDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    public async updateFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorDTO = req.body as IFloorDTO;

            const floorOrError = (await this.floorServiceInstance.updateFloor(floorDTO)) as Result<IFloorDTO>;

            if (floorOrError.isFailure) {
                return res.status(404).send();
            }

            const createdFloorDTO = floorOrError.getValue();
            return res.status(201).json(createdFloorDTO);
        } catch (e) {
            return next(e);
        }
    }

    public async patchFloor(req: Request, res: Response, next: NextFunction) {
        try {
            const floorId = req.params.id;
            const floorUpdate: IFloorDTO = req.body;
    
            //check if building exists
            const existingFloor = await this.floorServiceInstance.getFloor(floorId);
            if (!existingFloor) {
                return res.status(404).send();
            }
            const updatedFloor = await this.floorServiceInstance.patchFloor(floorId, floorUpdate);
    
            return res.status(200).json(updatedFloor);
        } catch (e) {
            return next(e);
        }
    }

    public async listAllFloors(req: Request, res: Response, next: NextFunction) {
        try {
            const floorOrError = await this.floorServiceInstance.findFloorsByBuildingId(req.params.buildingId) as Result<IFloorDTO[]>;
            const floorsList = floorOrError.getValue();
            return res.json(floorsList).status(200);
        } catch (e) {
            return next(e);
        }
    }
}
