import { Service, Inject } from 'typedi';

import IFloorRepo from '../services/IRepos/IFloorRepo';
import { Floor } from '../domain/floor/floor';
import {FloorMap } from '../mappers/FloorMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';
import { FloorId } from '../domain/floor/floorID';

@Service()
export default class FloorRepo implements IFloorRepo {
    private models: any;

    constructor(@Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(floor: Floor): Promise<boolean> {
        const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue() : floor.id;

        const query = { domainId: idX };
        const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

        return !!floorDocument === true;
    }

    public async save(floor: Floor): Promise<Floor> {
        const query = { domainId: floor.id.toString() };

        const floorDocument = await this.floorSchema.findOne(query);

        try {
            if (floorDocument === null) {
                const rawFloor: any = FloorMap.toPersistence(floor);

                const floorCreated = await this.floorSchema.create(rawFloor);

                return FloorMap.toDomain(floorCreated);
            } else {
                floorDocument.floorNumber = floor.floorNumber;
                floorDocument.description = floor.description;
                floorDocument.length = floor.length;
                floorDocument.width = floor.width;
                floorDocument.buildingId = floor.buildingId;
                await floorDocument.save();

                return floor;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(floorId: FloorId | string): Promise<Floor> {
        const query = { domainId: floorId };
        const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

        if (floorRecord != null) {
            return FloorMap.toDomain(floorRecord);
        } else return null;
    }

    public async getAllFloors(): Promise<Floor[]> {
        try {
            const floorDocuments = await this.floorSchema.find().exec();

            if (!floorDocuments) {
                return [];
            }

            const floors = floorDocuments.map((floorDocument) => FloorMap.toDomain(floorDocument));

            return floors;
        } catch (error) {
            throw new Error(`Error fetching floors: ${error.message}`);
        }
    }

    public async findFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
        try {
          console.log("id no repo:\n", buildingId);
          const query = {buildingId: buildingId} 
          const floorRecord = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>);

          if(floorRecord == null){
            console.log("floorRecord vazio - repo");
            return [];
          }

          const floorPromises = floorRecord.map((floorRecord) => FloorMap.toDomain(floorRecord));
          const floors = await Promise.all(floorPromises);
          console.log("lista", floors);
          return floors;

          /*const floors = floorRecord.map((floorRec) => FloorMap.toDomain(floorRec));
          console.log("lista", floors);
          return floors;*/
    
        } catch (error) {
            throw new Error(`Error fetching floors: ${error.message}`);
        }
    }
}
