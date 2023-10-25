import { Repo } from "../../core/infra/Repo";
import { Building } from "../../domain/building/building";
import { BuildingId } from "../../domain/building/buildingID";

export default interface IBuildingRepo extends Repo<Building> {
    save(building: Building): Promise<Building>;
    findByDomainId (buildingId: BuildingId | string): Promise<Building>;
    getAllBuildings(): Promise<Building[]>;
    
    //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
    //saveCollection (buildings: Building[]): Promise<Building[]>;
    //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}
