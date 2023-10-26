import { Inject, Service } from "typedi";
import IElevatorRepo from "../services/IRepos/IElevatorRepo";
import { Document, FilterQuery, Model } from "mongoose";
import { IElevatorPersistence } from "../dataschema/IElevatorPersistence";
import { Elevator } from "../domain/elevator/elevator";
import { ElevatorId } from "../domain/elevator/elevatorID";
import { ElevatorMap } from "../mappers/ElevatorMap";


@Service()
export default class ElevatorRepo implements IElevatorRepo {
    private models: any;

    constructor(@Inject('elevatorSchema') private elevatorSchema: Model<IElevatorPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(elevator: Elevator): Promise<boolean> {
        const idX = elevator.id instanceof ElevatorId ? (<ElevatorId>elevator.id).toValue() : elevator.id;
    
        const query = { domainId: idX };
        const elevatorDocument = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);
    
        return !!elevatorDocument === true;
    }
    
    public async save(elevator: any): Promise<any> {
        const query = { domainId: elevator.id.toString() };

        const elevatorDocument = await this.elevatorSchema.findOne(query);
    
        try {
          if (elevatorDocument === null) {
            const rawElevator: any = ElevatorMap.toPersistence(elevator);
    
            const elevatorCreated = await this.elevatorSchema.create(rawElevator);
    
            return ElevatorMap.toDomain(elevatorCreated);
          } else {
            elevatorDocument.x = elevator.x;
            elevatorDocument.y = elevator.y;
            elevatorDocument.buildingId = elevator.buildingId;
          
            await elevatorDocument.save();

            return elevator;
          }
        } catch (err) {
          throw err;
        }
    }

    public async findByDomainId(elevatorId: string): Promise<any> {
        return {id: elevatorId, x: 0, y: 0};
    }
} 