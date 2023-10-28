import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
    createRobot(req: Request, res: Response, next: NextFunction);
    updateRobot(req: Request, res: Response, next: NextFunction);
    patchRobot(req: Request, res: Response, next: NextFunction);
    listAllRobots(req: Request, res: Response, next: NextFunction);
}
