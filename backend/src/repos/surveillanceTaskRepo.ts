import { Document, FilterQuery, Model } from "mongoose";
import ISurveillanceTaskRepo from "../services/IRepos/ISurveillanceTaskRepo";
import { ISurveillanceTaskPersistence } from "../dataschema/ISurveillanceTaskPersistence";
import { Inject, Service } from "typedi";
import { SurveillanceTaskId } from "../domain/surveillanceTask/surveillanceTaskID";
import { SurveillanceTask } from "../domain/surveillanceTask/surveillanceTask";
import { SurveillanceTaskMap } from "../mappers/SurveillanceTaskMap";

@Service()
export default class SurveillanceTaskRepo implements ISurveillanceTaskRepo {
    private models: any;

    constructor(@Inject('surveillanceTaskSchema') private surveillanceTaskSchema: Model<ISurveillanceTaskPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(surveillanceTask: SurveillanceTask): Promise<boolean> {
        const idX = surveillanceTask.id instanceof SurveillanceTaskId ? (<SurveillanceTaskId>surveillanceTask.id).toValue() : surveillanceTask.id;

        const query = { domainId: idX };
        const surveillanceTaskDocument = await this.surveillanceTaskSchema.findOne(query as FilterQuery<ISurveillanceTaskPersistence & Document>);

        return !!surveillanceTaskDocument === true;
    }

    public async save(task: SurveillanceTask): Promise<SurveillanceTask> {
        const query = { domainId: task.id.toString() };

        const taskDocument = await this.surveillanceTaskSchema.findOne(query);
        try {
          if (taskDocument === null) {
            const rawTask: any = SurveillanceTaskMap.toPersistence(task);
    
            const taskCreated = await this.surveillanceTaskSchema.create(rawTask);
    
            return SurveillanceTaskMap.toDomain(taskCreated);
          } else {
            taskDocument.building = task.building;
            taskDocument.floors = task.floors;
            taskDocument.emergencyContact = task.emergencyContact;
            taskDocument.isPending = task.isPending;
            taskDocument.isApproved = task.isApproved;
            await taskDocument.save();
    
            return task;
          }
        } catch (err) {
          throw err;
        }
    }

    public async findByDomainId(taskId: SurveillanceTaskId | string): Promise<SurveillanceTask> {
        const query = { domainId: taskId };
        const taskRecord = await this.surveillanceTaskSchema.findOne(query as FilterQuery<ISurveillanceTaskPersistence & Document>);

        if (taskRecord != null) {
            return SurveillanceTaskMap.toDomain(taskRecord);
        } else return null;
    }

    public async getAllSurveillanceTasks(): Promise<SurveillanceTask[]> {
        try {
            const taskDocuments = await this.surveillanceTaskSchema.find().exec();
            console.log(taskDocuments);
            if (!taskDocuments) {
            return [];
            }

            const tasks = taskDocuments.map(taskDocument => SurveillanceTaskMap.toDomain(taskDocument));
            console.log(tasks);
            return tasks;
        } catch (error) {
            throw new Error(`Error fetching surveillance task: ${error.message}`);
        }
    }
}