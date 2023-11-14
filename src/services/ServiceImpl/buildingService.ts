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
import IClassroomDTO from '../../dto/IClassroomDTO';
import { Classroom } from '../../domain/classroom/classroom';
import IFloorRepo from '../IRepos/IFloorRepo';
import IFloorService from '../IServices/IFloorService';
import IClassroomRepo from '../IRepos/IClassroomRepo';
import IClassroomService from '../IServices/IClassroomService';
import { Floor } from '../../domain/floor/floor';
import IFloorDTO from '../../dto/IFloorDTO';
import { FloorMap } from '../../mappers/FloorMap';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(@Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
                @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
                @Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo,
                private floorService: IFloorService,
                private classroomService: IClassroomService) {}

    
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

    public async findByCode(code: string): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByCode(code);

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
    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const buildingOrError = await Building.create(buildingDTO);
    
            if (buildingOrError.isFailure) {
                const errorMessage = buildingOrError.errorValue();
                return Result.fail<IBuildingDTO>(errorMessage);
            }
    
            const buildingResult = buildingOrError.getValue();
            
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
    public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
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
    
            await this.buildingRepo.save(building);
    
            const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTOResult);
        } catch (error) {
            throw new Error(`Error patching building: ${error.message}`);
        }
    }
    
    /*public async loadFloors(buildingId: string, floor: IFloorDTO, classrooms: IClassroomDTO[]): Promise<Result<IFloorDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);
            console.log('\x1b[33m%s\x1b[0m', "Found the building: ", building.id);
            if (!building) {
              return Result.fail<IFloorDTO>('Building not found');
            }

            for (const classroom of classrooms) {
                console.log('\x1b[33m%s\x1b[0m', classroom);
            }
      
            // Create classrooms
            const createdClassrooms: IClassroomDTO[] = [];
            let classroomResult = null as Result<IClassroomDTO>;
            for (const classroomDTO of classrooms) {
                console.log('\x1b[33m%s\x1b[0m', "Now going to create/update classroom: ", classroomDTO.id);
                if(classroomDTO.id){
                    console.log('\x1b[33m%s\x1b[0m', "Classroom already exists, now updating...");
                    classroomResult = await this.classroomService.updateClassroom(classroomDTO);
                } 
                console.log('\x1b[33m%s\x1b[0m', "Classroom doesn't exist, now creating...");
                classroomResult = await this.classroomService.createClassroom(classroomDTO);
                
            }
            if (classroomResult.isFailure) {
                console.log('\x1b[33m%s\x1b[0m', "Error creating classroom: ", classroomResult.error);
                return Result.fail<IFloorDTO>(classroomResult.error);
            }
            console.log('\x1b[33m%s\x1b[0m', "Created classroom: ", classroomResult.getValue().id);
            createdClassrooms.push(classroomResult.getValue());
            
      
            // Create floor with associated classrooms
            const floorClassroomIds = createdClassrooms.map((classroom) => classroom.id.toString());
            const floorResult = await this.floorService.createFloor(floor, floorClassroomIds);
            if (floorResult.isFailure) {
              return Result.fail<IFloorDTO>(floorResult.error);
            }
            const createdFloor = floorResult.getValue();
      
            return Result.ok<IFloorDTO>(createdFloor);
          } catch (error) {
            throw new Error(`Error loading floors and classrooms: ${error.message}`);
          }
    }*/


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
     * Validates an array of floor IDs.
     * @param floorIds - An array of floor IDs to be validated.
     * @returns An array of valid floor IDs.
     */
    public async validateFloorIds(buildingId: string, floorIds: string[]): Promise<string[]> {
        const validFloorIds: string[] = [];

        for (const floorId of floorIds) {
            try {
                // check if the floorId is valid/exists
                const isValid = await this.floorRepo.findByDomainId(floorId);
                
                // check if floorId is already associated with another building
                for (const floorId of floorIds) {
                    const isAssociated = await this.buildingRepo.isFloorAssociated(buildingId, floorId);
                    if (isAssociated) {
                      throw new Error(`Floor ${floorId} is already associated with another building!`);
                    }
                }

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

    public async findBuildingByMinMaxFloors(minFloors: number, maxFloors: number): Promise<Result<IBuildingDTO[]>> {
        try{
          const buildings = await this.buildingRepo.findBuildingByMinMaxFloors(minFloors, maxFloors);
        
        if (buildings.length == 0) {
          return Result.fail<IBuildingDTO[]>("No buildings found");
        }
        return Result.ok<IBuildingDTO[]>(buildings);
      
    
        } catch (error) {
            throw error;
        }
      }


      /*public async getAllFloors(buildingId: string): Promise<Result<IFloorDTO[]>> {
        const floors: IFloorDTO[] = [];
        try {
            // lista com os id dos floors
            const building = await this.buildingRepo.findByDomainId(buildingId);
            const floorsIdList = building.floors;
            if(floorsIdList === null) {
                return Result.fail<IFloorDTO[]>("No floors found");
            }
            
            for (let i=0; i< floorsIdList.length; i++) {
                const floor = await this.floorRepo.findByDomainId(floorsIdList[i]);
                console.log("floor before 'toDTO'", floor);
                floors[i] = await (FloorMap.toDTO(floor) ) as IFloorDTO;
            }

            for(const floor of floors) {
                console.log("floor after 'toDTO'", floor);
            }

            return Result.ok<IFloorDTO[]>(floors);
        } catch (error) {
            throw new Error(`Error listing floors: ${error.message}`);
        }
    }*/
}
