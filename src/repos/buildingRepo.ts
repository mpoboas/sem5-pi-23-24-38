import { Service, Inject } from 'typedi';

import IBuildingRepo from '../services/IRepos/IBuildingRepo';
import { Building } from '../domain/building/building';
import { BuildingMap } from '../mappers/BuildingMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IBuildingPersistence } from '../dataschema/IBuildingPersistence';
import { BuildingId } from '../domain/building/buildingID';

@Service()
export default class BuildingRepo implements IBuildingRepo {
    private models: any;

    constructor(@Inject('buildingSchema') private buildingSchema: Model<IBuildingPersistence & Document>) {}

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
                buildingDocument.floors = building.floors;
                await buildingDocument.save();

                return building;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(buildingId: BuildingId | string): Promise<Building> {
        const query = { domainId: buildingId };
        const buildingRecord = await this.buildingSchema.findOne(query as FilterQuery<IBuildingPersistence & Document>);

        if (buildingRecord != null) {
            return BuildingMap.toDomain(buildingRecord);
        } else return null;
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
}
