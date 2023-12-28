import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
  signUp(req: Request, res: Response, next: NextFunction);
  signIn(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction)
  getAllUsers(req: Request, res: Response, next: NextFunction);
}
