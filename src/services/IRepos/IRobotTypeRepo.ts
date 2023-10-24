import { Repo } from "../../core/infra/Repo";
import { RobotType } from "../../domain/robotType/robotType";
import { RobotTypeId } from "../../domain/robotType/robotTypeId";

export default interface IRobotTypeRepo extends Repo<RobotType> {
    save(robotType: RobotType): Promise<RobotType>;
    findByDomainId (robotTypeId: RobotTypeId | string): Promise<RobotType>;
        
    //findByIds (robotTypesIds: RobotTypeId[]): Promise<RobotType[]>;
    //saveCollection (robotTypes: RobotType[]): Promise<RobotType[]>;
    //removeByRobotTypeIds (robotTypes: RobotTypeId[]): Promise<any>
}