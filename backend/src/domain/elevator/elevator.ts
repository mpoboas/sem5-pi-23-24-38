import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Coordinates } from '../coordinates';
import { Result } from '../../core/logic/Result';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import IElevatorDTO from '../../dto/IElevatorDTO';
import { Floor } from '../floor/floor';
import { Guard } from '../../core/logic/Guard';

interface ElevatorProps {
  name: string;
  floors: Floor[];
  buildingId: string;
  cordx: number;
  cordy: number;
}

export class Elevator extends AggregateRoot<ElevatorProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get floors(): Floor[] {
    return this.props.floors;
  }

  set floors(value: Floor[]) {
    this.props.floors = value;
  }

  get buildingId(): string {
    return this.props.buildingId;
  }

  set buildingId(value: string) {
    this.props.buildingId = value;
  }

  get cordx(): number {
    return this.props.cordx;
  }

  set cordx(value: number) {
    this.props.cordx = value;
  }

  get cordy(): number {
    return this.props.cordy;
  }

  set cordy(value: number) {
    this.props.cordy = value;
  }

  private constructor(props: ElevatorProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ElevatorProps, id?: UniqueEntityID): Result<Elevator> {
    const guardedProps = [
      { argument: props.name, argumentName: 'name' },
      { argument: props.floors, argumentName: 'floors' },
      { argument: props.buildingId, argumentName: 'buildingId' },
      { argument: props.cordx, argumentName: 'cordx' },
      { argument: props.cordy, argumentName: 'cordy' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Elevator>(guardResult.message);
    } else {
      const elevator = new Elevator(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Elevator>(elevator);
    }
  }
}
