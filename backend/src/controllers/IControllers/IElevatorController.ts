import { Request, Response, NextFunction } from 'express';

export default interface IElevatorController {
  createElevator(req: Request, res: Response, next: NextFunction);
  updateElevator(req: Request, res: Response, next: NextFunction);
  patchElevator(req: Request, res: Response, next: NextFunction);
  listAllElevators(req: Request, res: Response, next: NextFunction);
  findFloorsElevator(req: Request, res: Response, next: NextFunction);
  getElevatorAlgav(req: Request, res: Response, next: NextFunction);
}
