import { Result } from '../../core/logic/Result';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IFloorService {
  createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>>;
  patchFloor(floorId: string, floorUpdate: IFloorDTO): Promise<Result<IFloorDTO>>;
  getAllFloors(): Promise<IFloorDTO[]>;
  validateClassroomIds(classroomIds: string[]): Promise<string[]>;
  verifyFloorExists(floorId: string): Promise<Result<boolean>>;
  getFloor(floorId: string): Promise<Result<IFloorDTO>>;
  findFloorsByBuildingId(buildingCode: string): Result<IFloorDTO[]> | Promise<IFloorDTO[]>;
  getFloorByNumber(floorNumber: string): Promise<Result<IFloorDTO>>;
}