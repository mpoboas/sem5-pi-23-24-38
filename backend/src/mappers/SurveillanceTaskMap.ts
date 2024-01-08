import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { SurveillanceTask } from "../domain/surveillanceTask/surveillanceTask";

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import ISurveillanceTaskDTO from '../dto/ISurveillanceTaskDTO';
import { ISurveillanceTaskPersistence } from '../dataschema/ISurveillanceTaskPersistence';
import { Container } from 'typedi';
import FloorRepo from '../repos/floorRepo';

export class SurveillanceTaskMap extends Mapper<SurveillanceTask>{
    public static toDTO(task: SurveillanceTask): ISurveillanceTaskDTO {
        const floors: string[] = [];

        task.floors.forEach(floor => {
            floors.push(floor.floorNumber);
        });
        return {
            id: task.id.toString(),
            building: task.building,
            floors: floors,
            emergencyContact: task.emergencyContact,
            isPending: task.isPending,
            isApproved: task.isApproved,
        } as ISurveillanceTaskDTO;
    }

    public static async toDomain(taskDTO: any | Model<ISurveillanceTaskPersistence & Document>): Promise<SurveillanceTask> {
        const floorRepo = Container.get(FloorRepo);
        const floorsArray: any[] = [];
        const floors: string[] = taskDTO.floors;

        for (const floorId of floors) {
            const floor = await floorRepo.findByDomainId(floorId);
            if (!floor) {
                throw new ReferenceError('Floor not found');
            }
            floorsArray.push(floor);
        }
        const taskOrError = SurveillanceTask.create(
        {
            building: taskDTO.building,
            floors: floorsArray,
            emergencyContact: taskDTO.emergencyContact,
            isPending: taskDTO.isPending,
            isApproved: taskDTO.isApproved,
            active: true,
        },
        new UniqueEntityID(taskDTO.domainId),
        );
    
        taskOrError.isFailure ? console.log(taskOrError.error) : '';
    
        return taskOrError.isSuccess ? taskOrError.getValue() : null;
    }

    public static toPersistence(task: SurveillanceTask): any {
        const floors: string[] = [];

        task.floors.forEach(floor => {
            floors.push(floor.id.toString());
        });
        return {
            domainId: task.id.toString(),
            building: task.building,
            floors: floors,
            emergencyContact: task.emergencyContact,
            isPending: task.isPending,
            isApproved: task.isApproved,
        };
    }
}