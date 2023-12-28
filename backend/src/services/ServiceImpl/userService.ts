import { Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../../config';
import bcrypt from 'bcrypt';

//import MailerService from './mailer.ts.bak';

import IUserService from '../IServices/IUserService';
import { UserMap } from '../../mappers/UserMap';
import { IUserDTO } from '../../dto/IUserDTO';

import IUserRepo from '../IRepos/IUserRepo';
import IRoleRepo from '../IRepos/IRoleRepo';

import { User } from '../../domain/user/user';
import { Result } from '../../core/logic/Result';
import { Role } from '../../domain/role/role.enum';
import { UserId } from '../../domain/user/userId';

@Service()
export default class UserService implements IUserService {
  constructor(
    @Inject(config.repos.user.name) private userRepo: IUserRepo,
    @Inject(config.repos.role.name) private roleRepo: IRoleRepo,
    @Inject('logger') private logger,
  ) {}

  public async signUp(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const userDocument = await this.userRepo.findByEmail(userDTO.email);
      const found = !!userDocument;

      if (found) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User already exists with email: ' + userDTO.email);
      }

      // Check if role id is valid
      const isRoleValid = this.isValidRole(userDTO.role);
      if (!isRoleValid) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>("Role '" + userDTO.role + "' is not a valid role");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);

      const userOrError = await User.create({ ...userDTO, password: hashedPassword });

      if (userOrError.isFailure) {
        throw Result.fail<IUserDTO>(userOrError.errorValue());
      }

      const userResult = userOrError.getValue();

      this.logger.silly('Generating JWT');
      const token = this.generateToken(userResult);

      this.logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userResult);

      // this.eventDispatcher.dispatch(events.user.signUp, { user: userResult });

      await this.userRepo.save(userResult);
      const userDTOResult = UserMap.toDTO(userResult) as IUserDTO;
      return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO: userDTOResult, token: token });
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Error creating user:  ${e.message}`);
    }
  }

  public async signIn(email: string, password: string): Promise<Result<{ userDTO: IUserDTO; token: string }>> {
    try {
      const user = await this.userRepo.findByEmail(email);
  
      if (!user) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('User not registered');
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
   
      if (validPassword) {
        this.logger.silly('Password is valid!');
        this.logger.silly('Generating JWT');
  
        const token = this.generateToken(user) as string;
        const userDTO = UserMap.toDTO(user) as IUserDTO;
  
        return Result.ok<{ userDTO: IUserDTO; token: string }>({ userDTO, token });
      } else {
        return Result.fail<{ userDTO: IUserDTO; token: string }>('Invalid password');
      }
    } catch (error) {
      this.logger.error(`Error during sign-in: ${error.message}`);
      return Result.fail<{ userDTO: IUserDTO; token: string }>('Unexpected error during sign-in');
    }
  }

  public async getAllUsers(): Promise<any[]> {
    try {
      const info: any[] = [];
      const users = await this.userRepo.findAll();
      for(const user of users) {
        const name = user.name;
        const email = user.email;
        const role = user.role;
        const phoneNumber = user.phoneNumber;
        const nif = user.nif;
        info.push({name, email, role, phoneNumber, nif});
      }
      return info;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Error getting all users:  ${e.message}`);
    }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    
    const id = user.id;
    const email = user.email;
    const name = user.name;
    const role = user.role.id;
    const phoneNumber = user.phoneNumber;
    const nif = user.nif;

    return jwt.sign(
      {
        id: id,
        email: email, // We are gonna use this in the middleware 'isAuth'
        role: role,
        name: name,
        phoneNumber: phoneNumber,
        nif: nif,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  private isValidRole(role: string): boolean {
    return Object.values(Role).includes(role as Role);
  }

  public async delete(id: UserId | string): Promise<boolean> {
    const userDeleted = await this.userRepo.delete(id);
    console.log("user deleted (service):", userDeleted);
    if (userDeleted === false) {
      return false;
    } else {
      return true;
    }
  }
}
