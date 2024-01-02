import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { SurveillanceTask } from "../domain/surveillanceTask/surveillanceTask";

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ISurveillanceTaskDTO from '../dto/ISurveillanceTaskDTO';
import { ISurveillanceTaskPersistence } from '../dataschema/ISurveillanceTaskPersistence';

export class SurveillanceTaskMap extends Mapper<SurveillanceTask>{
    public static toDTO(task: SurveillanceTask): ISurveillanceTaskDTO {
        return {
            id: task.id.toString(),
            building: task.building,
            floors: task.floors,
            emergencyContact: task.emergencyContact,
            isPending: task.isPending,
            isApproved: task.isApproved,
        } as ISurveillanceTaskDTO;
    }

    public static toDomain(task: any | Model<ISurveillanceTaskPersistence & Document>): SurveillanceTask {
        const taskOrError = SurveillanceTask.create(task, new UniqueEntityID(task.domainId));
    
        taskOrError.isFailure ? console.log(taskOrError.error) : '';
    
        return taskOrError.isSuccess ? taskOrError.getValue() : null;
    }

    public static toPersistence(task: SurveillanceTask): any {
        return {
            domainId: task.id.toString(),
            building: task.building,
            floors: task.floors,
            emergencyContact: task.emergencyContact,
            isPending: task.isPending,
            isApproved: task.isApproved,
        };
    }
}