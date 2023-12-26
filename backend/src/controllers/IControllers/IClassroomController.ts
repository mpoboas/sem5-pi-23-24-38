import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController {
  createClassroom(req: Request, res: Response, next: NextFunction);
  updateClassroom(req: Request, res: Response, next: NextFunction);
  listAllClassrooms(req: Request, res: Response, next: NextFunction);
  getClasssroomsAlgav(req: Request, res: Response, next: NextFunction);
  listAllClassroomsInFloor(req: Request, res: Response, next: NextFunction);
}
