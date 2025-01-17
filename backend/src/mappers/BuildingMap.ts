import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';

import IBuildingDTO from '../dto/IBuildingDTO';
import { Building } from '../domain/building/building';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class BuildingMap extends Mapper<Building> {
  public static toDTO(building: Building): IBuildingDTO {
    return {
      id: building.id.toString(),
      letter: building.letter,
      length: building.length,
      width: building.width,
      description: building.description,
      code: building.code,
    } as IBuildingDTO;
  }

  public static toDomain(building: any | Model<IBuildingPersistence & Document>): Building {
    const buildingOrError = Building.create(building, new UniqueEntityID(building.domainId));

    buildingOrError.isFailure ? console.log(buildingOrError.error) : '';

    return buildingOrError.isSuccess ? buildingOrError.getValue() : null;
  }

  public static toPersistence(building: Building): any {
    return {
      domainId: building.id.toString(),
      letter: building.letter,
      length: building.length,
      width: building.width,
      description: building.description,
      code: building.code,
    };
  }
}
