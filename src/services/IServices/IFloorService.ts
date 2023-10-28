import { Result } from '../../core/logic/Result';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  verifyFloorExists(floorId: string): Promise<Result<boolean>>;
  getFloor(floorId: string): Promise<Result<IFloorDTO>>;
}