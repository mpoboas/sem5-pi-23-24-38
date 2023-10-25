import { Inject, Service } from "typedi";
import config from "../../config";
import IElevatorService from "../services/IServices/IElevatorService";
import IElevatorController from "./IControllers/IElevatorController";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IElevatorDTO from "../dto/IElevatorDTO";
import { Result } from "../core/logic/Result";


@Service()
export default class ElevatorController implements IElevatorController /* TODO: extends ../core/infra/BaseController */ {
    constructor(@Inject(config.services.elevator.name) private elevatorServiceInstance: IElevatorService) {}
    
    public async createElevator(req: Request, res: Response, next: NextFunction) {
        try {
            const elevatorOrError = (await this.elevatorServiceInstance.createElevator(req.body as IElevatorDTO)) as Result<IElevatorDTO>;

            if (elevatorOrError.isFailure) {
                return res.status(402).send();
            }

            const elevatorDTO = elevatorOrError.getValue();
            return res.json(elevatorDTO).status(201);
        } catch (e) {
            return next(e);
        }
    }

    
}
