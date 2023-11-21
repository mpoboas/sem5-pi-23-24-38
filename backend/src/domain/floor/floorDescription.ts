import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface FloorDescriptionProps {
  description: string;
}

export class FloorDescription extends ValueObject<FloorDescriptionProps> {
  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  private constructor(props: FloorDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<FloorDescription> {
    const guardedProps = [{ argument: description, argumentName: 'description' }];

    const guardResult = Guard.inRange(description.length, 0, 250, 'description');
    const guardResult2 = Guard.againstNullOrUndefinedBulk(guardedProps);
    //casos de erro
    if (!guardResult.succeeded) {
      return Result.fail<FloorDescription>(guardResult.message);
    } else if (!guardResult2.succeeded) {
      return Result.fail<FloorDescription>(guardResult2.message);
    } else {
      //casos sem erro
      const floorDescription = new FloorDescription({ description: description });
      return Result.ok<FloorDescription>(floorDescription);
    }
  }
}
