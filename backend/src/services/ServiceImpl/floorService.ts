import { Service, Inject } from 'typedi';
import config from '../../../config';
import IFloorDTO from '../../dto/IFloorDTO';
import { Floor } from '../../domain/floor/floor';
import IFloorRepo from '../IRepos/IFloorRepo';
import IFloorService from '../IServices/IFloorService';
import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../mappers/FloorMap';
import { FloorDescription } from '../../domain/floor/floorDescription';
import IClassroomRepo from '../IRepos/IClassroomRepo';
import IBuildingRepo from '../IRepos/IBuildingRepo';

@Service()
export default class FloorService implements IFloorService {
  constructor(
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    @Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
  ) {}

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

  public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const buildingId = floorDTO.buildingId;
      if (buildingId == null) {
        throw new Error('Building ID is required');
      }
      const building = await this.buildingRepo.findByDomainId(buildingId);
      if (building == null) {
        throw new Error('Building not found');
      }

      const floorOrError = await Floor.create(floorDTO);

      if (floorOrError.isFailure) {
        const errorMessage = floorOrError.errorValue();
        return Result.fail<IFloorDTO>(errorMessage);
      }

      const floorResult = floorOrError.getValue();

      await this.floorRepo.save(floorResult);

      const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (error) {
      throw new Error(`Error creating floor: ${error.message}`);
    }
  }

  public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.findByDomainId(floorDTO.id);

      if (floor === null) {
        return Result.fail<IFloorDTO>('Floor not found');
      } else {
        floor.floorNumber = floorDTO.floorNumber;
        floor.description = FloorDescription.create(floorDTO.description).getValue().description;
        floor.length = floorDTO.length;
        floor.width = floorDTO.width;
        const building = await this.buildingRepo.findByDomainId(floorDTO.buildingId);
        if (building == null) {
          throw new Error('Building not found');
        } else {
          floor.buildingId = floorDTO.buildingId;
        }
        floor.map = floorDTO.map;
        floor.json = floorDTO.json;

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
      if (floorUpdate.buildingId != null) {
        const building = await this.buildingRepo.findByDomainId(floorUpdate.buildingId);
        if (building == null) {
          throw new Error('Building not found');
        } else {
          floor.buildingId = floorUpdate.buildingId;
        }
      }
      if (floorUpdate.map != null) {
        floor.map = floorUpdate.map;
      }
      if (floorUpdate.json != null) {
        floor.json = floorUpdate.json;
      }

      await this.floorRepo.save(floor);

      const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
      return Result.ok<IFloorDTO>(floorDTOResult);
    } catch (error) {
      throw new Error(`Error patching floor: ${error.message}`);
    }
  }

  public async getAllFloors(): Promise<IFloorDTO[]> {
    try {
      const floors = await this.floorRepo.getAllFloors();

      return floors.map(floor => {
        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return floorDTOResult;
      });
    } catch (error) {
      throw new Error(`Error listing floors: ${error.message}`);
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
      const floors = await this.floorRepo.findFloorsByBuildingId(buildingId);

      if (floors.length == 0) {
        return [];
      }

      return floors.map(floor => {
        const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
        return floorDTOResult;
      });
    } catch (error) {
      throw new Error(`Error listing floors: ${error.message}`);
    }
  }

  public async getFloorByNumber(floorNumber: string): Promise<Result<IFloorDTO>> {
    try {
      const floor = await this.floorRepo.getFloorByNumber(floorNumber);

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
}
