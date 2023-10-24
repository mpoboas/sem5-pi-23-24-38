import { Service, Inject } from 'typedi';
import config from '../../../config';
import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { RobotType } from '../../domain/robotType/robotType';
import IRobotTypeRepo from '../IRepos/IRobotTypeRepo';
import IRobotTypeService from '../IServices/IRobotTypeService';
import { Result } from '../../core/logic/Result';
import { RobotTypeMap } from '../../mappers/RobotTypeMap';

@Service()
export default class RobotTypeService implements IRobotTypeService {
    constructor(@Inject(config.repos.robotType.name) private robotTypeRepo: IRobotTypeRepo) {}

    public async getRobotType(robotTypeId: string): Promise<Result<IRobotTypeDTO>> {
        try {
            const robotType = await this.robotTypeRepo.findByDomainId(robotTypeId);

            if (robotType === null) {
                return Result.fail<IRobotTypeDTO>('Robot type not found');
            } else {
                const robotTypeDTOResult = RobotTypeMap.toDTO(robotType) as IRobotTypeDTO;
                return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {
            const robotTypeOrError = await RobotType.create(robotTypeDTO);

            if (robotTypeOrError.isFailure) {
                return Result.fail<IRobotTypeDTO>(robotTypeOrError.errorValue());
            }

            const robotTypeResult = robotTypeOrError.getValue();

            await this.robotTypeRepo.save(robotTypeResult);

            const robotTypeDTOResult = RobotTypeMap.toDTO(robotTypeResult) as IRobotTypeDTO;
            return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
        } catch (e) {
            throw e;
        }
    }

    public async updateRobotType(robotTypeDTO: IRobotTypeDTO): Promise<Result<IRobotTypeDTO>> {
        try {
            const robotType = await this.robotTypeRepo.findByDomainId(robotTypeDTO.id);

            if (robotType === null) {
                return Result.fail<IRobotTypeDTO>('Robot type not found');
            } else {
                robotType.name = robotTypeDTO.name;
                await this.robotTypeRepo.save(robotType);

                const robotTypeDTOResult = RobotTypeMap.toDTO(robotType) as IRobotTypeDTO;
                return Result.ok<IRobotTypeDTO>(robotTypeDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }
}
