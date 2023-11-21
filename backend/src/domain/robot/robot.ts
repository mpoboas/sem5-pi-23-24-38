import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { RobotId } from './robotId';

import { RobotType } from '../robotType/robotType';
import { Guard } from '../../core/logic/Guard';

interface RobotProps {
  nickname: string;
  serialNr: string;
  description: string;
  isActive: boolean;
  robotType: RobotType;
}

export class Robot extends AggregateRoot<RobotProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get robotType(): RobotType {
    return this.props.robotType;
  }

  set robotType(value: RobotType) {
    this.props.robotType = value;
  }

  get robotId(): RobotId {
    return new RobotId(this.robotId.toValue());
  }

  get nickname(): string {
    return this.props.nickname;
  }

  set nickname(value: string) {
    this.props.nickname = value;
  }

  get serialNr(): string {
    return this.props.serialNr;
  }

  set serialNr(value: string) {
    this.props.serialNr = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(value: boolean) {
    this.props.isActive = value;
  }

  private constructor(props: RobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: RobotProps, id?: UniqueEntityID): Result<Robot> {
    const guardedProps = [
      { argument: props.nickname, argumentName: 'nickname' },
      { argument: props.serialNr, argumentName: 'serialNr' },
      { argument: props.description, argumentName: 'description' },
      { argument: props.isActive, argumentName: 'isActive' },
      { argument: props.robotType, argumentName: 'robotType' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Robot>(guardResult.message);
    } else {
      const robot = new Robot(
        {
          ...props,
        },
        id,
      );
      return Result.ok<Robot>(robot);
    }
  }
}
