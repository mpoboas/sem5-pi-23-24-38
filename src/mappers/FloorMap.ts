import { Mapper } from '../core/infra/Mapper';
import {Container} from "typedi";
import { Document, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import IFloorDTO from '../dto/IFloorDTO';
import { Floor } from '../domain/floor/floor';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';

export class FloorMap extends Mapper<Floor> {
  public static toDTO(floor : Floor): IFloorDTO {
    return {
      id: floor.id.toString(),
      floorNumber: floor.floorNumber.toString(),
      description: floor.description.toString(),
      length: floor.length,
      width: floor.width,
      classrooms: floor.classrooms,
    } as IFloorDTO;
  }



  public static async toDomain(floor: any | Model<IFloorPersistence & Document>): Promise<Floor> {
    const floorOrError = Floor.create(floor, new UniqueEntityID(floor.domainId));

    floorOrError.isFailure ? console.log(floorOrError.error) : '';

    return floorOrError.isSuccess ? floorOrError.getValue() : null;
  }


  public static toPersistence(floor: Floor): any {
    return {
        domainId: floor.id.toString(),
        floorNumber: floor.floorNumber,
        description: floor.description,
        length: floor.length,
        width: floor.width,
        classrooms: floor.classrooms,
    };
  }
}