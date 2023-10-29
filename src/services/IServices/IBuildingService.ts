import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';
import IFloorDTO from '../../dto/IFloorDTO';

export default interface IBuildingService {
  createBuilding(buildingDTO: IBuildingDTO, floors: string[]): Promise<Result<IBuildingDTO>>;
  updateBuilding(buildingDTO: IBuildingDTO, floors: string[]): Promise<Result<IBuildingDTO>>;
  patchBuilding(buildingId: string, buildingUpdate: IBuildingDTO): Promise<Result<IBuildingDTO>>;
  getAllBuildings(): Promise<IBuildingDTO[]>;
  validateFloorIds(buildingId: string, floorIds: string[]): Promise<string[]>;

  getBuilding(buildingId: string): Promise<Result<IBuildingDTO>>;
  findBuildingByMinMaxFloors(min: number, max: number): Promise<Result<Array<IBuildingDTO>>>;
  getAllFloors(buildingId: string): Promise<Result<IFloorDTO[]>>;
}
