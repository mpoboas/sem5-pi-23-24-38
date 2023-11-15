import { Repo } from "../../core/infra/Repo";
import { Floor } from "../../domain/floor/floor";
import { FloorId } from "../../domain/floor/floorID";
import IBuildingDTO from "../../dto/IBuildingDTO";

export default interface IFloorRepo extends Repo<Floor> {
    save(floor: Floor): Promise<Floor>;
    findByDomainId (floorId: FloorId | string): Promise<Floor>;
    getAllFloors(): Promise<Floor[]>;
    findFloorsByBuildingId(buildingCode: string): Promise<Floor[]>;    
 
    //findByIds (buildingsIds: BuildingId[]): Promise<Building[]>;
    //saveCollection (buildings: Building[]): Promise<Building[]>;
    //removeByBuildingIds (buildings: BuildingId[]): Promise<any>
}