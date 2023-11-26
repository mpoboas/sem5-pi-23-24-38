import { Result } from '../../core/logic/Result';
import IElevatorDTO from '../../dto/IElevatorDTO';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IElevatorService {
  createElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  updateElevator(elevatorDTO: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  getAllElevators(): Promise<IElevatorDTO[]>;
  getElevator(elevatorId: string): Promise<Result<IElevatorDTO>>;
  patchElevator(elevatorId: string, elevatorUpdate: IElevatorDTO): Promise<Result<IElevatorDTO>>;
  findFloorsElevator(elevatorId: string): Promise<IFloorDTO[]>;
}
