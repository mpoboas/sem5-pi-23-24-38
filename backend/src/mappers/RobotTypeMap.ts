import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IRobotTypePersistence } from '../dataschema/IRobotTypePersistence';

import IRobotTypeDTO from '../dto/IRobotTypeDTO';
import { RobotType } from '../domain/robotType/robotType';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class RobotTypeMap extends Mapper<RobotType> {
  public static toDTO(robotType: RobotType): IRobotTypeDTO {
    return {
      id: robotType.id.toString(),
      brand: robotType.brand,
      model: robotType.model,
      tasks: robotType.tasks,
      designation: robotType.designation,
    } as IRobotTypeDTO;
  }

  public static toDomain(robotType: any | Model<IRobotTypePersistence & Document>): RobotType {
    const robotTypeOrError = RobotType.create(robotType, new UniqueEntityID(robotType.domainId));

    robotTypeOrError.isFailure ? console.log(robotTypeOrError.error) : '';

    return robotTypeOrError.isSuccess ? robotTypeOrError.getValue() : null;
  }

  public static toPersistence(robotType: RobotType): any {
    return {
      domainId: robotType.id.toString(),
      brand: robotType.brand,
      model: robotType.model,
      tasks: robotType.tasks,
      designation: robotType.designation,
    };
  }
}
