import { Result } from '../../core/logic/Result';
import IRobotTypeDTO from '../../dto/IRobotTypeDTO';

export default interface IRobotTypeService {
    createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;
    updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>>;

    getRobotType(robotTypeId: string): Promise<Result<IRobotTypeDTO>>;
}
