import { Service, Inject } from 'typedi';
import config from '../../../config';
import IFloorDTO from '../../dto/IFloorDTO';
import { Floor} from '../../domain/floor/floor';
import IFloorRepo from '../IRepos/IFloorRepo';
import IFloorService from '../IServices/IFloorService';
import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../mappers/FloorMap';
import { FloorDescription } from '../../domain/floor/floorDescription';
import IClassroomRepo from '../IRepos/IClassroomRepo';



@Service()
export default class FloorService implements IFloorService {
    constructor(@Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
                @Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo) {}
   
    public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found');
            } else {
                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult);
            }
        } catch (e) {
            throw e;
        } 
    }

    public async createFloor(floorDTO: IFloorDTO, classroomIds: string[]): Promise<Result<IFloorDTO>> {
        try {

            
            const floorOrError = await Floor.create(floorDTO);

            if (floorOrError.isFailure) {
                const errorMessage = floorOrError.errorValue();
                return Result.fail<IFloorDTO>(errorMessage);
            }

            const floorResult = floorOrError.getValue();

            if (classroomIds != null) {
                const validClassroomIds = await this.validateClassroomIds(classroomIds);
                
                if (validClassroomIds.length > 0) {
                    floorResult.classrooms = validClassroomIds;
                }
            }

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (error) {
            throw new Error(`Error creating floor: ${error.message}`);
        }
    }

    public async updateFloor(floorDTO: IFloorDTO, classroomIds: string[]): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found');
            } else {
                floor.floorNumber = floorDTO.floorNumber;
                floor.description = FloorDescription.create(floorDTO.description).getValue().description;
                floor.length = floorDTO.length;
                floor.width = floorDTO.width;

                if (classroomIds.length === 0) {
                    floor.classrooms = [];
                }
                
                if (classroomIds != null) {
                    const validClassroomIds = await this.validateClassroomIds(classroomIds);
                    if (validClassroomIds.length > 0) {
                        floor.classrooms = validClassroomIds;
                    }
                }

                await this.floorRepo.save(floor);

                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async patchFloor(floorId: string, floorUpdate: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);
    
            if (!floor) {
                return Result.fail<IFloorDTO>('Floor not found');
            }
            
            if (floorUpdate.floorNumber != null) {
                floor.floorNumber = floorUpdate.floorNumber;
            }
            if (floorUpdate.description != null) {
                floor.description = FloorDescription.create(floorUpdate.description).getValue().description;
            }    
            if (floorUpdate.length != null) {
                floor.length = floorUpdate.length;
            }
            if (floorUpdate.width != null) {
                floor.width = floorUpdate.width;
            }
            if (floorUpdate.classrooms != null) {
                const validFloorIds = await this.validateClassroomIds(floorUpdate.classrooms);
    
                floor.classrooms = validFloorIds;
            }
    
            await this.floorRepo.save(floor);
    
            const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (error) {
            throw new Error(`Error patching floor: ${error.message}`);
        }
    }
    
    public async validateClassroomIds(classroomIds: string[]): Promise<string[]> {
        const validClassroomIds: string[] = [];

        for (const classroomId of classroomIds) {
            try {
                // Check if the classroomId is valid/exists
                const isValid = await this.classroomRepo.findByDomainId(classroomId);

                if (isValid != null) {
                    validClassroomIds.push(classroomId);
                } else {
                    throw new Error(`${classroomId} is not a valid classroom ID.`);
                }
            } catch (error) {
                throw new Error(`Error validating classroom ID: ${error.message}`);
            }
        }
        return validClassroomIds;
    }

    public async verifyFloorExists(floorId: string): Promise<Result<boolean>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<boolean>(false);
            } else {
                return Result.ok<boolean>(true);
            }
        } catch (e) {
            throw e;
        }
    }

    public async findFloorsByBuildingId(buildingId: string): Promise<IFloorDTO[]> {
        try {
            console.log("entra no service");
          const floors = await this.floorRepo.findFloorsByBuildingId(buildingId);
          console.log("entrou no repo");
          if (floors.length == 0) {
            console.log("lista vazia");
            return [];
          }

          return floors.map((floor) => {
            const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
            return floorDTOResult;
          });
         
        } catch (error) {
            throw new Error(`Error listing floors: ${error.message}`);
        }
      }


}
