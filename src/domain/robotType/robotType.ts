import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { RobotTypeId } from './robotTypeId';

import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { get } from 'lodash';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeProps {
    name: string;
    tasks?: string[];
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get robotTypeId(): RobotTypeId {
        return new RobotTypeId(this.robotTypeId.toValue());
    }

    get name(): string {
        return this.props.name;
    }

   
    set name(value: string) {
        this.props.name = value;
    } 
    
    get tasks(): string[] {
        return this.props.tasks;
    }

    set tasks(value: string[]) {
        this.props.tasks = value;
    }

    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    /*public static create(robotTypeDTO: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {
        const name = robotTypeDTO.name;
        const tasks = robotTypeDTO.tasks;

        if (!!name === false || name.length === 0) {
            return Result.fail<RobotType>('Must provide a robot type name');
        } else {
            const robotType = new RobotType({ name, tasks }, id);
            return Result.ok<RobotType>(robotType);
        }
    }*/
    
    public static create (props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

        const guardedProps = [
          { argument: props.name, argumentName: 'name' },
          { argument: props.tasks, argumentName: 'tasks' }
        ];
    
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
        if (!guardResult.succeeded) {
          return Result.fail<RobotType>(guardResult.message)
        } else {
          const robotType = new RobotType({
            ...props
          }, id);
    
          return Result.ok<RobotType>(robotType);
        }
      }

}
