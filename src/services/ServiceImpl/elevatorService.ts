import { Inject, Service } from "typedi";
import config from '../../../config';

import IElevatorService from "../IServices/IElevatorService";
import IElevatorRepo from "../IRepos/IElevatorRepo";
import { Result } from "../../core/logic/Result";
import IElevatorDTO from "../../dto/IElevatorDTO";
import { Elevator } from "../../domain/elevator/elevator";
import { ElevatorMap } from "../../mappers/ElevatorMap";

@Service()
export default class ElevatorService implements IElevatorService {
    constructor(@Inject(config.repos.elevator.name) private elevatorRepo: IElevatorRepo) {}

    public async createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>> {
        try {
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

}

