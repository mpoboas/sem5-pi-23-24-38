import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

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

  private static validateEmail(email: string): Result<String> {
    const regex: RegExp = /^[^\s@]+@isep.ipp.pt$/;
    if (email == null) {
      return Result.fail<String>("Email can't be empty");
    }
    if (!regex.test(email)) {
      return Result.fail<String>('Invalid Email');
    }
    return Result.ok<String>(email);
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
