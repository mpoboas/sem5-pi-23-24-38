import { Inject, Service } from 'typedi';
import config from '../../../config';

import IElevatorService from '../IServices/IElevatorService';
import IElevatorRepo from '../IRepos/IElevatorRepo';
import IBuildingRepo from '../IRepos/IBuildingRepo';
import { Result } from '../../core/logic/Result';
import IElevatorDTO from '../../dto/IElevatorDTO';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Elevator } from '../../domain/elevator/elevator';
import { ElevatorMap } from '../../mappers/ElevatorMap';
import IFloorRepo from '../IRepos/IFloorRepo';
import IFloorDTO from '../../dto/IFloorDTO';
import { Floor } from '../../domain/floor/floor';
import { FloorMap } from '../../mappers/FloorMap';

@Service()
export default class ElevatorService implements IElevatorService {
  constructor(
    @Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo,
    @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
    @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
  ) {}

  public async getElevator(elevatorId: string): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const building = await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);
      if (building === null) {
        return Result.fail<IElevatorDTO>('Building not found');
      }
      const floorsB = await this.floorRepo.findFloorsByBuildingId(elevatorDTO.buildingId);

      if (floorsB === null) {
        return Result.fail<IElevatorDTO>('Floors not found');
      }

      const floors: string[] = [];

      elevatorDTO.floors.forEach(floor => {
        const floor2 = floorsB.find(floorB => floorB.id.toString() === floor);
        if (!floor2) {
          throw new ReferenceError('Floor not found');
        }
        floors.push(floor2.id.toString());
      });

      const elevator = await ElevatorMap.toDomain(elevatorDTO);

      const elevatorCreated = await this.elevatorRepo.save(elevator);

      if (elevatorCreated === null) {
        return Result.fail<IElevatorDTO>('Elevator already exists');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const elevatorDTOResult = ElevatorMap.toDTO(elevatorCreated) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (error) {
      throw new Error(`Error creating elevator: ${error.message}`);
    }
  }

  public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.id);

      if (elevator === null) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      } else {
        const building = await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);
        if (building === null) {
          return Result.fail<IElevatorDTO>('Building not found');
        }

        const floorsB = await this.floorRepo.findFloorsByBuildingId(elevatorDTO.buildingId);

        if (floorsB === null) {
          return Result.fail<IElevatorDTO>('Floors not found');
        }

        const floors: string[] = [];

        elevatorDTO.floors.forEach(floor => {
          const floor2 = floorsB.find(floorB => floorB.id.toString() === floor);

          if (!floor2) {
            throw new ReferenceError('Floor not found');
          }
          floors.push(floor2.id.toString());
        });

        elevator.name = elevatorDTO.name;

        elevator.buildingId = elevatorDTO.buildingId;
        await this.elevatorRepo.save(elevator);

        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return Result.ok<IElevatorDTO>(elevatorDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async patchElevator(elevatorId: string, patchData: any): Promise<Result<IElevatorDTO>> {
    // Implementation goes here
    return null;
  }
  /*
  public async patchElevator(elevatorId: string, elevatorUpdate: IElevatorDTO): Promise<Result<IElevatorDTO>> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (!elevator) {
        return Result.fail<IElevatorDTO>('Elevator not found');
      }

      if (elevatorUpdate.x != null) {
        elevator.x = elevatorUpdate.x;
      }

      if (elevatorUpdate.y != null) {
        elevator.y = elevatorUpdate.y;
      }

      if (elevatorUpdate.buildingId != null) {
        elevator.buildingId = elevatorUpdate.buildingId;
      }

      await this.elevatorRepo.save(elevator);

      const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
      return Result.ok<IElevatorDTO>(elevatorDTOResult);
    } catch (error) {
      throw new Error(`Error patching elevator: ${error.message}`);
    }
  }
*/
  public async getAllElevators(): Promise<IElevatorDTO[]> {
    try {
      const elevators = await this.elevatorRepo.getAllElevators();

      return elevators.map(elevator => {
        const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
        return elevatorDTOResult;
      });
    } catch (error) {
      throw new Error(`Error fetching elevator: ${error.message}`);
    }
  }

  public async findFloorsElevator(elevatorId: string): Promise<IFloorDTO[]> {
    try {
      const elevator = await this.elevatorRepo.findByDomainId(elevatorId);

      if (elevator === null) {
        return null;
      } else {
        const floors = elevator.floors;

        const floorsDTO = Promise.all(floors.map(floor => {
          const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
          return floorDTOResult;
        }));

      return floorsDTO;

    }
  } catch (e) {
      throw e;
  }


  }

}
