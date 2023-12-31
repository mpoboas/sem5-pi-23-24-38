import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface UserEmailProps {
  email: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static validateEmail(email: string): Result<string> {
    const regex: RegExp = /^[^\s@]+@isep.ipp.pt$/;
    if (email == null) {
      return Result.fail<string>("Email can't be empty");
    }
    if (!regex.test(email)) {
      return Result.fail<string>('Invalid Email');
    }
    return Result.ok<string>(email);
  }

  public static create(email: string): Result<UserEmail> {
    const validate = this.validateEmail(email);
    if (!validate.isSuccess) {
      return Result.fail<UserEmail>(validate);
    } else {
      return Result.ok<UserEmail>(new UserEmail({ email: email }));
    }
  }
}
