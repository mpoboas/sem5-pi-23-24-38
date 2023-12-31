import { Request, Response, NextFunction } from 'express';

export default interface IRoleController {
  getAllRoles(req: Request, res: Response, next: NextFunction);
}
