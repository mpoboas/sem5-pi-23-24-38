import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';
import IClassroomDTO from '../../dto/IClassroomDTO';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IBuildingService {
  createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  patchBuilding(buildingId: string, buildingUpdate: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  //loadFloors(buildingId: string, floor: IFloorDTO, classrooms: IClassroomDTO[]): Promise<Result<IFloorDTO>>;
  getAllBuildings(): Promise<IBuildingDTO[]>;
  validateFloorIds(buildingId: string, floorIds: string[]): Promise<string[]>;

  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  findByCode(code: string): Promise<Result<IBuildingDTO>>;
  findBuildingByMinMaxFloors(min: number, max: number): Promise<Result<Array<IBuildingDTO>>>;
  //getAllFloors(buildingId: string): Promise<Result<IFloorDTO[]>>;
}
