import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { RobotTypeId } from './robotTypeId';

import IRobotTypeDTO from '../../dto/IRobotTypeDTO';

interface RobotTypeProps {
    name: string;
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
    private constructor(props: RobotTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(robotTypeDTO: IRobotTypeDTO, id?: UniqueEntityID): Result<RobotType> {
        const name = robotTypeDTO.name;

        if (!!name === false || name.length === 0) {
            return Result.fail<RobotType>('Must provide a robot type name');
        } else {
            const robotType = new RobotType({ name: name }, id);
            return Result.ok<RobotType>(robotType);
        }
    }
}
