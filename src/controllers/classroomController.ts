import { Inject, Service } from "typedi";
import IClassroomService from "../services/IServices/IClassroomService";
import IClassroomController from "./IControllers/IClassroomController";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
import IClassroomDTO from "../dto/IClassroomDTO";

@Service()
export default class ClassroomController implements IClassroomController {
    constructor(@Inject(config.services.classroom.name) private classroomServiceInstance: IClassroomService) {}

    public async createClassroom(req: Request, res: Response, next: NextFunction) {
        try {
            const classroomDTO = req.body as IClassroomDTO;
            
            const classroomOrError = await this.classroomServiceInstance.createClassroom(classroomDTO);

            if (classroomOrError.isFailure) {
                return res.status(402).send();
            }

            const createdClassroomDTO = classroomOrError.getValue(); // Rename the variable

            return res.json(createdClassroomDTO).status(201); // Rename the variable
        } catch (e) {
            return next(e);
        }
    }

    public async updateClassroom(req: Request, res: Response, next: NextFunction) {
        try {
            const classroomDTO = req.body as IClassroomDTO;
            
            const classroomOrError = await this.classroomServiceInstance.updateClassroom(classroomDTO);

            if (classroomOrError.isFailure) {
                return res.status(404).send();
            }

            const updatedClassroomDTO = classroomOrError.getValue(); // Rename the variable

            return res.status(201).json(updatedClassroomDTO); // Rename the variable
        } catch (e) {
            return next(e);
        }
        
    }
}