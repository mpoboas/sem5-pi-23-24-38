import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { RobotTypeId } from './robotTypeId';

import IRobotTypeDTO from '../../dto/IRobotTypeDTO';
import { get } from 'lodash';
import { Guard } from '../../core/logic/Guard';

interface RobotTypeProps {
    tasks?: string[];
    brand: string;
    model: string;
}

export class RobotType extends AggregateRoot<RobotTypeProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get robotTypeId(): RobotTypeId {
        return new RobotTypeId(this.robotTypeId.toValue());
    }

    get tasks(): string[] {
        return this.props.tasks;
    }

    set tasks(value: string[]) {
        this.props.tasks = value;
    }

    get brand(): string {
        return this.props.brand;
    }

    set brand(value: string) {
        this.props.brand = value;
    }

    get model(): string {
        return this.props.model;
    }

    set model(value: string) {
        this.props.model = value;
    }

    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: RobotTypeProps, id?: UniqueEntityID): Result<RobotType> {

        const guardedProps = [
          { argument: props.tasks, argumentName: 'tasks' },
          { argument: props.brand, argumentName: 'brand' },
          { argument: props.model, argumentName: 'model' }
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
