import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface DeliveryDescriptionProps {
  description: string;
}

export class DeliveryDescription extends ValueObject<DeliveryDescriptionProps> {
  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  private constructor(props: DeliveryDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<DeliveryDescription> {
    const guardedProps = [{ argument: description, argumentName: 'description' }];

    const guardResult = Guard.inRange(description.length, 0, 250, 'description');
    const guardResult2 = Guard.againstNullOrUndefinedBulk(guardedProps);
    //casos de erro
    if (!guardResult.succeeded) {
      return Result.fail<DeliveryDescription>(guardResult.message);
    } else if (!guardResult2.succeeded) {
      return Result.fail<DeliveryDescription>(guardResult2.message);
    } else {
      //casos sem erro
      const deliveryDescription = new DeliveryDescription({ description: description });
      return Result.ok<DeliveryDescription>(deliveryDescription);
    }
  }
}
