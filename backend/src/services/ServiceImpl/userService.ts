import { Service, Inject } from 'typedi';

import jwt from 'jsonwebtoken';
import config from '../../../config';
import argon2 from 'argon2';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

//import MailerService from './mailer.ts.bak';

import IUserService from '../IServices/IUserService';
import { UserMap } from '../../mappers/UserMap';
import { IUserDTO } from '../../dto/IUserDTO';

import IUserRepo from '../IRepos/IUserRepo';
import IRoleRepo from '../IRepos/IRoleRepo';

import { User } from '../../domain/user/user';
import { UserPassword } from '../../domain/user/userPassword';
import { UserEmail } from '../../domain/user/userEmail';

import { Role } from '../../domain/role/role';

import { Result } from '../../core/logic/Result';
import { UserPhoneNumber } from '../../domain/user/userPhoneNumber';
import { UserNif } from '../../domain/user/userNif';

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
      const isRoleValid = await this.getRole(userDTO.role);
      if (isRoleValid.isFailure) {
        return Result.fail<{ userDTO: IUserDTO; token: string }>(isRoleValid.error);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(userDTO.password, 10);

      const userOrError = await User.create({ ...userDTO, password: hashedPassword });

      if (userOrError.isFailure) {
        console.log('[USER SERVICE] Error creating user');
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

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for userId: ${user._id}`);

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

  private async getRole(roleId: string): Promise<Result<Role>> {
    const role = await this.roleRepo.findByDomainId(roleId);
    const found = !!role;

    if (found) {
      return Result.ok<Role>(role);
    } else {
      return Result.fail<Role>("Couldn't find role with id: " + roleId);
    }
  }
}
