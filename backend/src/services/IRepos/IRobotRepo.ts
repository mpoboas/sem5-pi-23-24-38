import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot/robot";
import { RobotId } from "../../domain/robot/robotId";

export default interface IRobotRepo extends Repo<Robot> {
    save(robot: Robot): Promise<Robot>;
    findByDomainId (robotId: RobotId | string): Promise<Robot>;
    getAllRobots(): Promise<Robot[]>;
        
    //findByIds (robotsIds: RobotId[]): Promise<Robot[]>;
    //saveCollection (robots: Robot[]): Promise<Robot[]>;
    //removeByRobotIds (robots: RobotId[]): Promise<any>
}
