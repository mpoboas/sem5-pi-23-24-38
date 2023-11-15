import { Service, Inject } from 'typedi';

import IRobotTypeRepo from '../services/IRepos/IRobotTypeRepo';
import { RobotType } from '../domain/robotType/robotType';
import { RobotTypeId } from '../domain/robotType/robotTypeId';
import { RobotTypeMap } from '../mappers/RobotTypeMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

@Service()
export default class RobotTypeRepo implements IRobotTypeRepo {
    private models: any;


    constructor(@Inject('robotTypeSchema') private robotTypeSchema: Model<IRobotTypePersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(robotType: RobotType): Promise<boolean> {
        const idX = robotType.id instanceof RobotTypeId ? (<RobotTypeId>robotType.id).toValue() : robotType.id;

        const query = { domainId: idX };
        const robotTypeDocument = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

        return !!robotTypeDocument === true;
    }

    public async save(robotType: RobotType): Promise<RobotType> {
        const query = { domainId: robotType.id.toString() };

        const robotTypeDocument = await this.robotTypeSchema.findOne(query);

        try {
            if (robotTypeDocument === null) {
                const rawRobotType: any = RobotTypeMap.toPersistence(robotType);

                const robotTypeCreated = await this.robotTypeSchema.create(rawRobotType);

                return RobotTypeMap.toDomain(robotTypeCreated);
            } else {
                robotTypeDocument.brand = robotType.brand;
                robotTypeDocument.model = robotType.model;
                robotTypeDocument.tasks = robotType.tasks;
                await robotTypeDocument.save();

                
                return robotType;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(robotTypeId: RobotTypeId | string): Promise<RobotType> {
        const query = { domainId: robotTypeId };
        const robotTypeRecord = await this.robotTypeSchema.findOne(query as FilterQuery<IRobotTypePersistence & Document>);

        if (robotTypeRecord != null) {
            return RobotTypeMap.toDomain(robotTypeRecord);
        } else return null;
    }


    public async getAllRobotTypes(): Promise<RobotType[]> {
        try {
            const robotTypeDocuments = await this.robotTypeSchema.find().exec();
            if (!robotTypeDocuments) {
                return [];
            }
            
            const robotTypes = await Promise.all(robotTypeDocuments.map((robotTypeDocument) => RobotTypeMap.toDomain(robotTypeDocument)));
            return robotTypes;
        
        } catch (error) {
            throw new Error(`Error fetching robot types: ${error.message}`);
        }
    }
}
