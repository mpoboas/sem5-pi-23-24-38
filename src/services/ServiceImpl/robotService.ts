import { Service, Inject } from 'typedi';
import config from '../../../config';
import IRobotDTO from '../../dto/IRobotDTO';
import { Robot } from '../../domain/robot/robot';
import IRobotRepo from '../IRepos/IRobotRepo';
import IRobotService from '../IServices/IRobotService';
import { Result } from '../../core/logic/Result';
import { RobotMap } from '../../mappers/RobotMap';
import IRobotTypeService from '../IServices/IRobotTypeService';

@Service()
export default class RobotService implements IRobotService {
    constructor(@Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
                @Inject(config.services.robotType.name) private robotTypeService: IRobotTypeService) {}

    public async getRobot(robotId: string): Promise<Result<IRobotDTO>> {
        try {
            const robot = await this.robotRepo.findByDomainId(robotId);

            if (robot === null) {
                return Result.fail<IRobotDTO>('Robot type not found');
            } else {
                const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
                return Result.ok<IRobotDTO>(robotDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            const robotTypeExists = await this.robotTypeService.verifyRobotTypeExists(robotDTO.robotTypeId);
            if(!robotTypeExists){
                return Result.fail<IRobotDTO>('robotype not found');
            }
            const robot = await RobotMap.toDomain(robotDTO);
            const robotCreated = await this.robotRepo.save(robot);

            if (robotCreated === null) {
                return Result.fail<IRobotDTO>('Robot already exists');
            }
            const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
            return Result.ok<IRobotDTO>(robotDTOResult);

        } catch (e) {

            return Result.fail<IRobotDTO>(e.message);
        }
    }

    public async updateRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
        try {
            const robot = await this.robotRepo.findByDomainId(robotDTO.id);

            if (robot === null) {
                return Result.fail<IRobotDTO>('Robot type not found');
            } else {
                robot.nickname = robotDTO.nickname;
                robot.description = robotDTO.description;
                robot.serialNr = robotDTO.serialNr;
                
                //srobot.robotType = robotDTO.robotTypeId;
                await this.robotRepo.save(robot);

                const robotDTOResult = RobotMap.toDTO(robot) as IRobotDTO;
                return Result.ok<IRobotDTO>(robotDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }
}

