import { Document, FilterQuery, Model } from "mongoose";
import IPickupDeliveryTaskRepo from "../services/IRepos/IPickupDeliveryTaskRepo";
import { IPickupDeliveryTaskPersistence } from "../dataschema/IPickupDeliveryTaskPersistence";
import { Inject, Service } from "typedi";
import { PickupDeliveryTaskId } from "../domain/pickupDeliveryTask/pickupDeliveryTaskID";
import { PickupDeliveryTask } from "../domain/pickupDeliveryTask/pickupDeliveryTask";
import { PickupDeliveryTaskMap } from "../mappers/PickupDeliveryTaskMap";

@Service()
export default class PickupDeliveryTaskRepo implements IPickupDeliveryTaskRepo {
    private models: any;

    constructor(@Inject('pickupDeliveryTaskSchema') private pickupDeliveryTaskSchema: Model<IPickupDeliveryTaskPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(pickupDeliveryTask: PickupDeliveryTask): Promise<boolean> {
        const idX = pickupDeliveryTask.id instanceof PickupDeliveryTaskId ? (<PickupDeliveryTaskId>pickupDeliveryTask.id).toValue() : pickupDeliveryTask.id;

        const query = { domainId: idX };
        const pickupDeliveryTaskDocument = await this.pickupDeliveryTaskSchema.findOne(query as FilterQuery<IPickupDeliveryTaskPersistence & Document>);

        return !!pickupDeliveryTaskDocument === true;
    }

    public async save(task: PickupDeliveryTask): Promise<PickupDeliveryTask> {
        const query = { domainId: task.id.toString() };
        console.log(task);
        const taskDocument = await this.pickupDeliveryTaskSchema.findOne(query);
        console.log(taskDocument);
        try {
          if (taskDocument === null) {
            const rawTask: any = PickupDeliveryTaskMap.toPersistence(task);
    
            const taskCreated = await this.pickupDeliveryTaskSchema.create(rawTask);
    
            return PickupDeliveryTaskMap.toDomain(taskCreated);
          } else {
            taskDocument.pickupClassroom = task.pickupClassroom;
            taskDocument.deliveryClassroom = task.deliveryClassroom;
            taskDocument.pickupContact = task.pickupContact;
            taskDocument.deliveryContact = task.deliveryContact;
            taskDocument.confirmationCode = task.confirmationCode;
            taskDocument.deliveryDescription = task.deliveryDescription;
            taskDocument.isPending = task.isPending;
            taskDocument.isApproved = task.isApproved;
            console.log(taskDocument);
            await taskDocument.save();
    
            return task;
          }
        } catch (err) {
          throw err;
        }
    }

    public async findByDomainId(taskId: PickupDeliveryTaskId | string): Promise<PickupDeliveryTask> {
        const query = { domainId: taskId };
        const taskRecord = await this.pickupDeliveryTaskSchema.findOne(query as FilterQuery<IPickupDeliveryTaskPersistence & Document>);

        if (taskRecord != null) {
            return PickupDeliveryTaskMap.toDomain(taskRecord);
        } else return null;
    }

    public async getAllPickupDeliveryTasks(): Promise<PickupDeliveryTask[]> {
        try {
            const taskDocuments = await this.pickupDeliveryTaskSchema.find().exec();
            if (!taskDocuments) {
            return [];
            }

            const tasks = taskDocuments.map(taskDocument => PickupDeliveryTaskMap.toDomain(taskDocument));
            return tasks;
        } catch (error) {
            throw new Error(`Error fetching pickup delivery task: ${error.message}`);
        }
    }
}