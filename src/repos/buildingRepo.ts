import { Service, Inject } from 'typedi';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from '../domain/building/building';
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { BuildingId } from '../domain/building/buildingID';
import IBuildingDTO from '../dto/IBuildingDTO';
import { size } from 'lodash';
import { IFloorPersistence } from '../dataschema/IFloorPersistence';

@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;
    private model: Model<IBuildingPersistence & Document>;

    constructor(@Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>,
                @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>) {
        this.model = buildingSchema;
    }

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(building: Building): Promise<boolean> {
        const idX = building.id instanceof BuildingId ? (<BuildingId>building.id).toValue() : building.id;

        const query = { domainId: idX };
        const buildingDocument = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

        return !!buildingDocument === true;
    }

    public async save(building: Building): Promise<Building> {
        const query = { domainId: building.id.toString() };

        const buildingDocument = await this.buildingSchema.findOne(query);

        try {
            if (buildingDocument === null) {
                const rawBuilding: any = BuildingMap.toPersistence(building);

                const buildingCreated = await this.buildingSchema.create(rawBuilding);

                return BuildingMap.toDomain(buildingCreated);
            } else {
                buildingDocument.letter = building.letter;
                buildingDocument.length = building.length;
                buildingDocument.width = building.width;
                buildingDocument.description = building.description;
                buildingDocument.code = building.code;
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            throw err;
        }
    }

    
    /**
     * TODO: This is now deprecated!!!
     * Checks if a floor is associated with a building.
     * @param floorId - The ID of the floor to check.
     * @returns A Promise that resolves to a boolean indicating whether the floor is associated with a building.
     */
    public async isFloorAssociated(buildingId: string, floorId: string): Promise<boolean> {
        const building = await this.model.findOne({ floors: floorId });
        if (!building) {
            return false;
        }
        return building.domainId.toString() !== buildingId;; // allow the floor to be associated with the building if it is the same building
      }
      

    public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
        const query = { domainId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

        if (buildingRecord != null) {
            return BuildingMap.toDomain(buildingRecord);
        } else return null;
    }

    public async findByCode(code: string): Promise<Building> {
        const query = { code: code };
        const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

        if (buildingRecord != null) {
            return BuildingMap.toDomain(buildingRecord);
        } else {
            return null;
        }
    }

    public async getAllBuildings(): Promise<Building[]> {
        try {
            const buildingDocuments = await this.buildingSchema.find().exec();

            if (!buildingDocuments) {
                return [];
            }

            const buildings = buildingDocuments.map((buildingDocument) => BuildingMap.toDomain(buildingDocument));

            return buildings;
        } catch (error) {
            throw new Error(`Error fetching buildings: ${error.message}`);
        }
    }

    public async findBuildingByMinMaxFloors(minFloors: number, maxFloors: number): Promise<Building[]> {
        try {
            // Encontrar os IDs dos edifícios que têm a quantidade correta de andares
            const buildingIDsInRange = await this.floorSchema.aggregate([
              {
                $group: {
                  _id: '$buildingId', 
                  totalFloors: { $sum: 1 }
                }
              },
              {
                $match: {
                  totalFloors: { $gte: minFloors, $lte: maxFloors }
                }
              }
            ]).exec();
        
            // Obter os IDs dos edifícios encontrados na etapa anterior
            const buildingIDs = buildingIDsInRange.map(item => item._id);
        
            console.log("buildingIDs dos edificios dentro do range", buildingIDs);
        
            // Array para armazenar os resultados
            const buildingDocuments: Building[] = [];
        
            // Loop sobre cada buildingId e chamar o método findByDomainId
            for (const buildingId of buildingIDs) {
              const result = await this.findByDomainId(buildingId);
              if (result) {
                buildingDocuments.push(result);
              }
            }
        
            console.log("buildings encontrados atraves do id", buildingDocuments);
        
            return buildingDocuments;
          } catch (error) {
            throw error;
          }
    }
      
}
