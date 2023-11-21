import { Result } from '../../core/logic/Result';
import IRobotDTO from '../../dto/IRobotDTO';

export default interface IRobotService {
  createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
  patchRobot(robotId: string, robotUpdate: IRobotDTO): Promise<Result<IRobotDTO>>;
  getAllRobots(): Promise<IRobotDTO[]>;

  getRobot(robotId: string): Promise<Result<IRobotDTO>>;
}
