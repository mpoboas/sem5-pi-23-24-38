import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor/floor";
import { FloorId } from "../../domain/floor/floorID";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByDomainId (floorId: FloorId | string): Promise<Floor>;
        
    //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
    //saveCollection (buildings: Building[]): Promise<Building[]>;
    //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}