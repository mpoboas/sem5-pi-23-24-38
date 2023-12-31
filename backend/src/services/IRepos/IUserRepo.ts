import { Repo } from '../../core/infra/Repo';
import { User } from '../../domain/user/user';
import { UserEmail } from '../../domain/user/userEmail';
import { UserId } from '../../domain/user/userId';

export default interface IUserRepo extends Repo<User> {
  save(user: User): Promise<User>;
  findByEmail(email: UserEmail | string): Promise<User>;
  findById(id: string): Promise<User>;
  delete(id: UserId | string): Promise<boolean>;
  findAll(): Promise<User[]>;
}
