import { Service, Inject } from 'typedi';
import config from '../../../config';
import IBuildingDTO from '../../dto/IBuildingDTO';
import { Building } from '../../domain/building/building';
import IBuildingRepo from '../IRepos/IBuildingRepo';
import IBuildingService from '../IServices/IBuildingService';
import { Result } from '../../core/logic/Result';
import { BuildingMap } from '../../mappers/BuildingMap';
import { BuildingLetter } from '../../domain/building/buildingLetter';
import { BuildingDescription } from '../../domain/building/buildingDescription';
import { BuildingCode } from '../../domain/building/buildingCode';
import IFloorRepo from '../IRepos/IFloorRepo';
import { Floor } from '../../domain/floor/floor';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(@Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
                @Inject(config.repos.floor.name) private floorRepo: IFloorRepo) {}

    public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);

            if (building === null) {
                return Result.fail<IBuildingDTO>('Building not found');
            } else {
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return Result.ok<IBuildingDTO>(buildingDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    
    /**
     * Creates a new building with the given data and associates it with the provided floor IDs.
     * @param buildingDTO The data for the building to be created.
     * @param floorIds The IDs of the floors to associate with the building.
     * @returns A Promise that resolves to a Result containing either the created building's data or an error message.
     */
    public async createBuilding(buildingDTO: IBuildingDTO, floorIds: string[]): Promise<Result<IBuildingDTO>> {
        try {
            const buildingOrError = await Building.create(buildingDTO);
    
            if (buildingOrError.isFailure) {
                const errorMessage = buildingOrError.errorValue();
                return Result.fail<IBuildingDTO>(errorMessage);
            }
    
            const buildingResult = buildingOrError.getValue();
            
            // Associate floors with the building
            if (floorIds != null) {
                const validFloorIds = await this.validateFloorIds(floorIds);
                
                if (validFloorIds.length > 0) {
                    buildingResult.floors = validFloorIds;
                }
            }
            await this.buildingRepo.save(buildingResult);
    
            const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTOResult);
        } catch (error) {
            throw new Error(`Error creating building: ${error.message}`);
        }
    }
    
    /**
     * Updates a building and its associated floors.
     * @param buildingDTO - The building data transfer object to update.
     * @param floorIds - An array of floor IDs to associate with the building.
     * @returns A promise that resolves to a Result object containing the updated building data transfer object.
     * If the building is not found, the promise resolves to a failed Result object with an error message.
     * If an error occurs during the update, the promise is rejected with the error.
     */
    public async updateBuilding(buildingDTO: IBuildingDTO, floorIds: string[]): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);
    
            if (building === null) {
                return Result.fail<IBuildingDTO>('Building not found');
            } else {
                // Update building properties as before
                building.letter = BuildingLetter.create(buildingDTO.letter).getValue().letter;
                building.length = buildingDTO.length;
                building.width = buildingDTO.width;
                building.description = BuildingDescription.create(buildingDTO.description).getValue().description;
                building.code = BuildingCode.create(buildingDTO.code).getValue().code;

                // if floorIds = 0 send empty list to remove existing floors
                if (floorIds.length === 0) {
                    building.floors = [];
                }
                
                if (floorIds != null) {
                    const validFloorIds = await this.validateFloorIds(floorIds);
                    if (validFloorIds.length > 0) {
                        building.floors = validFloorIds;
                    }
                }
                
                await this.buildingRepo.save(building);
    
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return Result.ok<IBuildingDTO>(buildingDTOResult);
            }
        } catch (error) {
            throw new Error(`Error updating building: ${error.message}`);
        }
    }
    
    public async patchBuilding(buildingId: string, buildingUpdate: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);
    
            if (!building) {
                return Result.fail<IBuildingDTO>('Building not found');
            }
    
            if (buildingUpdate.letter != null) {
                building.letter = BuildingLetter.create(buildingUpdate.letter).getValue().letter;
            }
            if (buildingUpdate.length != null) {
                building.length = buildingUpdate.length;
            }
            if (buildingUpdate.width != null) {
                building.width = buildingUpdate.width;
            }
            if (buildingUpdate.description != null) {
                building.description = BuildingDescription.create(buildingUpdate.description).getValue().description;
            }
            if (buildingUpdate.code != null) {
                building.code = BuildingCode.create(buildingUpdate.code).getValue().code;
            }
    
            if (buildingUpdate.floors != null) {
                const validFloorIds = await this.validateFloorIds(buildingUpdate.floors);
    
                building.floors = validFloorIds;
            }
    
            await this.buildingRepo.save(building);
    
            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTOResult);
        } catch (error) {
            throw new Error(`Error patching building: ${error.message}`);
        }
    }
    

    /**
     * Retrieves all buildings from the database and returns them as an array of building DTOs.
     * @returns {Promise<IBuildingDTO[]>} A promise that resolves to an array of building DTOs.
     * @throws {Error} If there was an error fetching the buildings from the database.
     */
    public async getAllBuildings(): Promise<IBuildingDTO[]> {
        try {
            const buildings = await this.buildingRepo.getAllBuildings();

            return buildings.map((building) => {
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return buildingDTOResult;
            });
        } catch (error) {
            throw new Error(`Error fetching buildings: ${error.message}`);
        }
    }

    /**
     * Validates and filters an array of floor IDs.
     * @param floorIds - An array of floor IDs to be validated and filtered.
     * @returns An array of valid floor IDs.
     */
    public async validateFloorIds(floorIds: string[]): Promise<string[]> {
        const validFloorIds: string[] = [];

        for (const floorId of floorIds) {
            try {
                // Check if the floorId is valid/exists
                const isValid = await this.floorRepo.findByDomainId(floorId);

                if (isValid != null) {
                    validFloorIds.push(floorId);
                } else {
                    throw new Error(`${floorId} is not a valid floor ID.`);
                }
            } catch (error) {
                throw new Error(`Error validating floor ID: ${error.message}`);
            }
        }
        return validFloorIds;
    }

}
