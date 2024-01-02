import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { PickupDeliveryTask } from "../domain/pickupDeliveryTask/pickupDeliveryTask";

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IPickupDeliveryTaskDTO from '../dto/IPickupDeliveryTaskDTO';
import { IPickupDeliveryTaskPersistence } from '../dataschema/IPickupDeliveryTaskPersistence';

export class PickupDeliveryTaskMap extends Mapper<PickupDeliveryTask>{
    public static toDTO(task: PickupDeliveryTask): IPickupDeliveryTaskDTO {
        return {
            id: task.id.toString(),
            pickupClassroom: task.pickupClassroom,
            deliveryClassroom: task.deliveryClassroom,
            pickupContact: task.pickupContact,
            deliveryContact: task.deliveryContact,
            confirmationCode: task.confirmationCode,
            deliveryDescription: task.deliveryDescription,
            isPending: task.isPending,
            isApproved: task.isApproved,
        } as IPickupDeliveryTaskDTO;
    }

    public static toDomain(task: any | Model<IPickupDeliveryTaskPersistence & Document>): PickupDeliveryTask {
        const taskOrError = PickupDeliveryTask.create(task, new UniqueEntityID(task.domainId));
    
        taskOrError.isFailure ? console.log(taskOrError.error) : '';
    
        return taskOrError.isSuccess ? taskOrError.getValue() : null;
    }

    public static toPersistence(task: PickupDeliveryTask): any {
        return {
            domainId: task.id.toString(),
            pickupClassroom: task.pickupClassroom,
            deliveryClassroom: task.deliveryClassroom,
            pickupContact: task.pickupContact,
            deliveryContact: task.deliveryContact,
            confirmationCode: task.confirmationCode,
            deliveryDescription: task.deliveryDescription,
            isPending: task.isPending,
            isApproved: task.isApproved,
        };
    }
}