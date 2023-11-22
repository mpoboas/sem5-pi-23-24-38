import { Inject, Service } from 'typedi';
import IElevatorRepo from '../services/IRepos/IElevatorRepo';
import { Document, FilterQuery, Model } from 'mongoose';
import { IElevatorPersistence } from '../dataschema/IElevatorPersistence';
import { Elevator } from '../domain/elevator/elevator';
import { ElevatorId } from '../domain/elevator/elevatorID';
import { ElevatorMap } from '../mappers/ElevatorMap';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import e from 'express';

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

  public async save(elevator: Elevator): Promise<Elevator> {
    const query = { domainId: elevator.id.toString() };
    const elevatorDocument = await this.elevatorSchema.findOne(query);
    try {
      if (elevatorDocument === null) {
        const rawElevator: any = ElevatorMap.toPersistence(elevator);

        const elevatorCreated = await this.elevatorSchema.create(rawElevator);
        ~console.log(elevatorCreated.floors);
        const eleven = await ElevatorMap.toDomain(elevatorCreated);
        return eleven;
      } else {
        const floors: string[] = [];
        elevator.floors.forEach(floor => {
          floors.push(floor.id.toString());
        });

        elevatorDocument.name = elevator.name;
        elevatorDocument.floors = floors;
        elevatorDocument.buildingId = elevator.buildingId;

        await elevatorDocument.save();

        return elevator;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(elevatorId: string): Promise<any> {
    const query = { domainId: elevatorId };
    const elevatorRecord = await this.elevatorSchema.findOne(query as FilterQuery<IElevatorPersistence & Document>);

    if (elevatorRecord != null) {
      return ElevatorMap.toDomain(elevatorRecord);
    } else return null;
  }

  public async getAllElevators(): Promise<Elevator[]> {
    try {
      const elevatorDocuments = await this.elevatorSchema.find().exec();

      if (!elevatorDocuments) {
        return [];
      }

      const elevators = elevatorDocuments.map(elevatorDocument => ElevatorMap.toDomain(elevatorDocument));
      const elevators2 = await Promise.all(elevators);

      return elevators2;
    } catch (error) {
      throw new Error(`Error fetching elevator: ${error.message}`);
    }
  }
}
