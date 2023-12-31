import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { IUserDTO } from '../../dto/IUserDTO';
import { UserPhoneNumber } from './userPhoneNumber';
import { UserNif } from './userNif';

interface UserProps {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  nif: string;
}

export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    this.props.email = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }

  get role(): string {
    return this.props.role;
  }

  set role(value: string) {
    this.props.role = value;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  set phoneNumber(value: string) {
    this.props.phoneNumber = value;
  }

  get nif(): string {
    return this.props.nif;
  }

  set nif(value: string) {
    this.props.nif = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(userDTO: IUserDTO, id?: UniqueEntityID): Result<User> {
    const userEmail = UserEmail.create(userDTO.email);
    const userPassword = UserPassword.create({ value: userDTO.password });
    const userPhoneNumber = UserPhoneNumber.create(userDTO.phoneNumber);
    const userNif = UserNif.create(userDTO.nif);

    if (userEmail.isFailure) {
      return Result.fail<User>('Error in user email: ' + userEmail.error.toString());
    } else if (userPassword.isFailure) {
      return Result.fail<User>('Error in user passowrd: ' + userPassword.error.toString());
    } else if (userPhoneNumber.isFailure) {
      return Result.fail<User>('Error in user phone number: ' + userPhoneNumber.error.toString());
    } else if (userNif.isFailure) {
      return Result.fail<User>('Error in user NIF: ' + userNif.error.toString());
    } else {
      const user = new User(
        {
          name: userDTO.name,
          email: userEmail.getValue().email,
          password: userPassword.getValue().password,
          role: userDTO.role,
          phoneNumber: userPhoneNumber.getValue().phoneNumber,
          nif: userNif.getValue().nif,
        },
        id,
      );
      return Result.ok<User>(user);
    }
  }
}
