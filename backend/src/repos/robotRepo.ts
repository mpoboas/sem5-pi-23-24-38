import { Service, Inject } from 'typedi';

import IRobotRepo from '../services/IRepos/IRobotRepo';
import { Robot } from '../domain/robot/robot';
import { RobotId } from '../domain/robot/robotId';
import { RobotMap } from '../mappers/RobotMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

@Service()
export default class RobotRepo implements IRobotRepo {
  private models: any;

  constructor(@Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(robot: Robot): Promise<boolean> {
    const idX = robot.id instanceof RobotId ? (<RobotId>robot.id).toValue() : robot.id;

    const query = { domainId: idX };
    const robotDocument = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

    return !!robotDocument === true;
  }

  public async save(robot: Robot): Promise<Robot> {
    const query = { domainId: robot.id.toString() };

    const robotDocument = await this.robotSchema.findOne(query);

    try {
      if (robotDocument === null) {
        const rawRobot: any = RobotMap.toPersistence(robot);

        const robotCreated = await this.robotSchema.create(rawRobot);

        return RobotMap.toDomain(robotCreated);
      } else {
        robotDocument.nickname = robot.nickname;
        robotDocument.isActive = robot.isActive;
        robotDocument.description = robot.description;
        robotDocument.serialNr = robot.serialNr;
        robotDocument.robotTypeId = robot.robotType.id.toString();

        await robotDocument.save();

        return robot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(robotId: RobotId | string): Promise<Robot> {
    const query = { domainId: robotId };
    const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);

    if (robotRecord != null) {
      return RobotMap.toDomain(robotRecord);
    } else return null;
  }

  public async getAllRobots(): Promise<Robot[]> {
    try {
      const robotDocuments = await this.robotSchema.find().exec();

      if (!robotDocuments) {
        return [];
      }

      const robots = await Promise.all(
        robotDocuments.map(async robotDocument => await RobotMap.toDomain(robotDocument)),
      );

      return robots;
    } catch (error) {
      throw new Error(`Error fetching robots: ${error.message}`);
    }
  }
}
