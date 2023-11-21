import { Mapper } from '../core/infra/Mapper';
import IRobotDTO from '../dto/IRobotDTO';
import { Robot } from '../domain/robot/robot';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { RobotType } from '../domain/robotType/robotType';
import RobotTypeRepo from '../repos/robotTypeRepo';
import { Container } from 'typedi';

export class RobotMap extends Mapper<Robot> {
  public static toDTO(robot: Robot): IRobotDTO {
    const robotDTO: IRobotDTO = {
      id: robot.id.toString(),
      nickname: robot.nickname,
      serialNr: robot.serialNr,
      description: robot.description,
      isActive: robot.isActive,
      robotTypeId: robot.robotType.id.toString(),
    };
    return robotDTO;
  }

  public static async toDomain(robotDTO: any): Promise<Robot> {
    const robotTypeRepo = Container.get(RobotTypeRepo);
    const robotTypeId = await robotTypeRepo.findByDomainId(robotDTO.robotTypeId);
    if (!robotTypeId) {
      throw new ReferenceError('Robot Type not found');
    }
    const robotOrError = Robot.create(
      {
        robotType: robotTypeId,
        nickname: robotDTO.nickname,
        serialNr: robotDTO.serialNr,
        description: robotDTO.description,
        isActive: robotDTO.isActive,
      },
      new UniqueEntityID(robotDTO.domainId),
    );
    return robotOrError.isSuccess ? robotOrError.getValue() : null;
  }

  public static toPersistence(robot: Robot): any {
    return {
      domainId: robot.id.toString(),
      nickname: robot.nickname,
      serialNr: robot.serialNr,
      description: robot.description,
      isActive: robot.isActive,
      robotTypeId: robot.robotType.id.toValue(),
    };
  }

  public static async getRobotType(robotTypeId: string): Promise<RobotType> {
    const robotTypeRepo = Container.get(RobotTypeRepo);
    const robotType = await robotTypeRepo.findByDomainId(robotTypeId);
    if (!robotType) {
      throw new ReferenceError('Robot Type not found');
    }
    return robotType;
  }
}
