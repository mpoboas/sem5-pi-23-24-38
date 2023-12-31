import { Service, Inject } from 'typedi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Document, FilterQuery, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from '../services/IRepos/IUserRepo';
import { User } from '../domain/user/user';
import { UserId } from '../domain/user/userId';
import { UserEmail } from '../domain/user/userEmail';
import { UserMap } from '../mappers/UserMap';

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema: Model<IUserPersistence & Document>,
    @Inject('logger') private logger,
  ) {}

  public async exists(user: User): Promise<boolean> {
    const idX = user.id instanceof UserId ? (<UserId>user.id).toValue() : user.id;

    const query = { domainId: idX };
    const userDocument = await this.userSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(user: User): Promise<User> {
    const query = { domainId: user.id.toString() };

    const userDocument = await this.userSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      } else {
        userDocument.name = user.name;
        userDocument.email = user.email;
        userDocument.password = user.password;
        userDocument.role = user.role;
        userDocument.phoneNumber = user.phoneNumber;
        userDocument.nif = user.nif;
        await userDocument.save();

        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail(email: UserEmail | string): Promise<User> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    } else return null;
  }

  public async findById(id: UserId | string): Promise<User> {
    const query = { domainId: id.toString() };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    } else return null;
  }

  public async delete(id: UserId | string): Promise<boolean> {
    if (id == null) {
      console.log('id is null (repo):', id);
    }
    const query = { domainId: id.toString() };
    const userRecord = await this.userSchema.findOne(query);
    if (userRecord != null) {
      await userRecord.remove();
      return true;
    } else return false;
  }

  public async findAll(): Promise<User[]> {
    try {
      const userDocuments = await this.userSchema.find().exec();

      if (!userDocuments) {
        return [];
      }

      const users = userDocuments.map(userDocument => UserMap.toDomain(userDocument));
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }
}
