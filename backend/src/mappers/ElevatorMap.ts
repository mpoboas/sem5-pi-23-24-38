// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Document, Model } from 'mongoose';
import { Mapper } from '../core/infra/Mapper';
import { Elevator } from '../domain/elevator/elevator';
import IElevatorDTO from '../dto/IElevatorDTO';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Container } from 'typedi';
import FloorRepo from '../repos/floorRepo';
import BuildingRepo from '../repos/buildingRepo';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDTO {
    const floors: string[] = [];

    elevator.floors.forEach(floor => {
      floors.push(floor.floorNumber);
    });

    return {
      id: elevator.id.toString(),
      name: elevator.name,
      floors: floors,
      buildingId: elevator.buildingId,
    } as IElevatorDTO;
  }

  public static async toDomain(elevatorDTO: any): Promise<Elevator> {
    const floorRepo = Container.get(FloorRepo);
    const floorsArray: any[] = [];
    const quem: string[] = elevatorDTO.floors;

    for (const floor of quem) {
      //console.log(floor);
      const floorId = await floorRepo.findByDomainId(floor);
      if (!floorId) {
        throw new ReferenceError('Floor not found');
      }
      floorsArray.push(floorId);
    }
    const elevatorOrError = Elevator.create(
      {
        name: elevatorDTO.name,
        floors: floorsArray,
        buildingId: elevatorDTO.buildingId,
      },
      new UniqueEntityID(elevatorDTO.domainId),
    );

    //elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): any {
    const floors: string[] = [];

    elevator.floors.forEach(floor => {
      floors.push(floor.id.toString());
    });
    return {
      domainId: elevator.id.toString(),
      name: elevator.name,
      floors: floors,
      buildingId: elevator.buildingId,
    };
  }
}
