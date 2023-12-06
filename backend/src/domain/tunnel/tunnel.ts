import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';

import { Result } from '../../core/logic/Result';
import { TunnelId } from './tunnelId';

import { Guard } from '../../core/logic/Guard';
import { Floor } from '../floor/floor';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Coordinates } from '../coordinates';

interface TunnelProps {
  description: string;
  location1: number[];
  location2: number[];
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

  get location1(): number[] {
    return this.props.location1;
  }

  set location1(value: number[]) {
    this.props.location1 = value;
  }

  get location2(): number[] {
    return this.props.location2;
  }

  set location2(value: number[]) {
    this.props.location2 = value;
  }

  private constructor(props: TunnelProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TunnelProps, id?: UniqueEntityID): Result<Tunnel> {
    const guardedProps = [
      { argument: props.description, argumentName: 'description' },
      { argument: props.floor1, argumentName: 'floor1' },
      { argument: props.floor2, argumentName: 'floor2' },
      { argument: props.location1, argumentName: 'location1' },
      { argument: props.location2, argumentName: 'location2' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Tunnel>(guardResult.message);
    } else {
      const tunnel = new Tunnel(
        {
          ...props,
        },
        id,
      );
      return Result.ok<Tunnel>(tunnel);
    }
  }
}
