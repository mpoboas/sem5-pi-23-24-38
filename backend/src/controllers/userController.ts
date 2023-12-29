import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IUserController from './IControllers/IUserController';
import IUserService from '../services/IServices/IUserService';

@Service()
export default class UserController
  implements IUserController {
  constructor(@Inject(config.services.user.name) private userServiceInstance: IUserService) {}

  public async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = req.body;

      const userOrError = await this.userServiceInstance.signUp(userDTO);

      if (userOrError.isFailure) {
        return res.status(400).send("Failed to sign up user: " + userOrError.errorValue());
      }

      const createdUserDTO = userOrError.getValue();

      return res.json(createdUserDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const userDTO = req.body;

      const userOrError = await this.userServiceInstance.signIn(userDTO.email, userDTO.password);

      if (userOrError.isFailure) {
        return res.status(404).send("Failed to sign in user: " + userOrError.errorValue());
      }

      const createdUserDTO = userOrError.getValue();

      return res.status(201).json(createdUserDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async editUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const userDTO = req.body;
      
      const existingUser = await this.userServiceInstance.getUser(userId);
      if (existingUser.isFailure) {
        return res.status(404).send("Failed to edit user: " + existingUser.errorValue());
      }

      const userOrError = await this.userServiceInstance.editUser(userId, userDTO);
      if (userOrError.isFailure) {
        return res.status(404).send("Failed to edit user: " + userOrError.errorValue());
      }

      return res.status(201).json(userOrError);
    } catch (e) {
      return next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const trueOrFalse = await this.userServiceInstance.delete(userId);
      if (trueOrFalse === false) {
        return res.status(404).send("Failed to delete user" );
      }
      return res.status(201).json("User deleted");
    } catch (e) {
      return next(e);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userServiceInstance.getAllUsers();
      return res.status(200).json(users);
    } catch (e) {
      return next(e);
    }
  }

}
