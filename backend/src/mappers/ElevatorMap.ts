import { Document, Model } from 'mongoose';
import { Mapper } from '../core/infra/Mapper';
import { Elevator } from '../domain/elevator/elevator';
import IElevatorDTO from '../dto/IElevatorDTO';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class ElevatorMap extends Mapper<Elevator> {
  public static toDTO(elevator: Elevator): IElevatorDTO {
    return {
      id: elevator.id.toString(),
      x: elevator.x,
      y: elevator.y,
      buildingId: elevator.buildingId,
    } as IElevatorDTO;
  }

  public static toDomain(elevator: any | Model<IBuildingPersistence & Document>): Elevator {
    const elevatorOrError = Elevator.create(elevator, new UniqueEntityID(elevator.domainId));

    elevatorOrError.isFailure ? console.log(elevatorOrError.error) : '';

    return elevatorOrError.isSuccess ? elevatorOrError.getValue() : null;
  }

  public static toPersistence(elevator: Elevator): any {
    return {
      domainId: elevator.id.toString(),
      x: elevator.x,
      y: elevator.y,
      buildingId: elevator.buildingId,
    };
  }
}
