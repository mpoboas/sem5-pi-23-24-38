import { Mapper } from '../core/infra/Mapper';

import { IUserDTO } from '../dto/IUserDTO';

import { User } from '../domain/user/user';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

export class UserMap extends Mapper<User> {
  public static toDTO(user: User): IUserDTO {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phoneNumber,
      nif: user.nif,
    } as IUserDTO;
  }

  public static toDomain(user: any | Model<IUserPersistence & Document>): User {
    const userOrError = User.create(user, new UniqueEntityID(user.domainId));

    userOrError.isFailure ? console.log(userOrError.error) : '';

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(user: User): any {
    return {
      domainId: user.id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      phoneNumber: user.phoneNumber,
      nif: user.nif,
    };
  }
}
