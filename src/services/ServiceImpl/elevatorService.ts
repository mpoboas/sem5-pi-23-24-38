import { Inject, Service } from "typedi";
import config from '../../../config';

import IElevatorService from "../IServices/IElevatorService";
import IElevatorRepo from "../IRepos/IElevatorRepo";
import IBuildingRepo from "../IRepos/IBuildingRepo";
import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";
import { Elevator } from "../../domain/elevator/elevator";
import { ElevatorMap } from "../../mappers/ElevatorMap";
import { Coordinates } from "../../domain/coordinates";

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(@Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo, @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo) {}
    
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
                console.log('Building not found');
                return Result.fail<IElevatorDTO>('Building not found');
            }
            
            const elevatorOrError = await Elevator.create(elevatorDTO);

            if (elevatorOrError.isFailure) {
                const errorMessage = elevatorOrError.errorValue();
                return Result.fail<IElevatorDTO>(errorMessage);
            }

            const elevatorResult = elevatorOrError.getValue();

            await this.elevatorRepo.save(elevatorResult);

            const elevatorDTOResult = ElevatorMap.toDTO(elevatorResult) as IElevatorDTO;
            return Result.ok<IElevatorDTO>(elevatorDTOResult);
        } catch (error) {
            throw new Error(`Error creating elevator: ${error.message}`);
        }
    }

    public async updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
            const elevator = await this.elevatorRepo.findByDomainId(elevatorDTO.id);

            const building = await this.buildingRepo.findByDomainId(elevatorDTO.buildingId);
            if (building === null) {
                console.log('Building not found');
                return Result.fail<IElevatorDTO>('Building not found');
            }
            

            if (elevator === null) {
                return Result.fail<IElevatorDTO>('Elevator not found');
            } else {
                elevator.x = elevatorDTO.x;
                elevator.y = elevatorDTO.y;
                elevator.buildingId = elevatorDTO.buildingId;
                await this.elevatorRepo.save(elevator);

                const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
                return Result.ok<IElevatorDTO>(elevatorDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

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

    public async getAllElevators(): Promise<IElevatorDTO[]> {
        try{
            const elevators = await this.elevatorRepo.getAllElevators();

            return elevators.map((elevator) => {
                const elevatorDTOResult = ElevatorMap.toDTO(elevator) as IElevatorDTO;
                return elevatorDTOResult;
            });
        } catch (error) {
            throw new Error(`Error fetching elevator: ${error.message}`);
        }
    }

}

