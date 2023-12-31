import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface UserNifProps {
  nif: string;
}

export class UserNif extends ValueObject<UserNifProps> {
  get nif(): string {
    return this.props.nif;
  }

  set nif(value: string) {
    this.props.nif = value;
  }

  private constructor(props: UserNifProps) {
    super(props);
  }

  private static validateNif(nif: string): Result<string> {
    const regex: RegExp = /^\d{9}$/;
    if (nif == null) {
      return Result.fail<string>("NIF can't be empty");
    }
    if (!regex.test(nif)) {
      return Result.fail<string>('Invalid NIF');
    }
    return Result.ok<string>(nif);
  }

  public static create(nif: string): Result<UserNif> {
    const validate = this.validateNif(nif);
    if (!validate.isSuccess) {
      return Result.fail<UserNif>(validate);
    } else {
      return Result.ok<UserNif>(new UserNif({ nif: nif }));
    }
  }
}
