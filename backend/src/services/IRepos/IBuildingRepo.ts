import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/building";
import { BuildingId } from "../../domain/building/buildingID";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IBuildingRepo extends Repo<Building> {
    save(building: Building): Promise<Building>;
    findByDomainId (buildingId: BuildingId | string): Promise<Building>;
    //isFloorAssociated (buildingId: string, floorId: string): Promise<boolean>;
    getAllBuildings(): Promise<Building[]>;
    findBuildingByMinMaxFloors(min: number, max: number): Promise<Building[]>;
    findByCode (code: string): Promise<Building>;
    
    //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
    //saveCollection (buildings: Building[]): Promise<Building[]>;
    //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}
