import { Result } from '../../core/logic/Result';
import { UserId } from '../../domain/user/userId';
import { IUserDTO } from '../../dto/IUserDTO';

export default interface IUserService {
  signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  signIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>>;
  delete(id : UserId | string): Promise<boolean>;
  getAllUsers(): Promise<any[]>;
}
