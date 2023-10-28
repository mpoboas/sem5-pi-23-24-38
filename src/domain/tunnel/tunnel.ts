import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { TunnelId } from './tunnelId';

import ITunnelDTO from '../../dto/ITunnelDTO';
import { Guard } from '../../core/logic/Guard';
import { Coordinates } from '../coordinates';
import { Floor } from '../floor/floor';

interface TunnelProps {
    description: string;
    //location1: Coordinates;
    //location2: Coordinates;
    floor1: Floor;
    floor2: Floor;
}

export class Tunnel extends AggregateRoot<TunnelProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get tunnelId(): TunnelId {
        return new TunnelId(this.tunnelId.toValue());
    }

    get description(): string {
        return this.props.description;
    }

    set description(value: string) {
        this.props.description = value;
    }

    get floor1(): Floor {
        return this.props.floor1;
    }
    
    set floor1(value: Floor) {
        this.props.floor1 = value;
    }

    get floor2(): Floor {
        return this.props.floor2;
    }   

    set floor2(value: Floor) {  
        this.props.floor2 = value;
    }

    private constructor(props: TunnelProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: TunnelProps, id?: UniqueEntityID): Result<Tunnel> {
        const guardedProps = [
            { argument: props.description, argumentName: 'description' },
            { argument: props.floor1, argumentName: 'floor1' },
            { argument: props.floor2, argumentName: 'floor2' }];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Tunnel>(guardResult.message)
        } else {
            const tunnel = new Tunnel({
                ...props
            }, id);
            return Result.ok<Tunnel>(tunnel);
        }
    }
}
