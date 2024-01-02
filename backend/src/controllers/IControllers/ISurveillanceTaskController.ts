import { Request, Response, NextFunction } from 'express';

export default interface ISurveillanceTaskController {
    createSurveillanceTask(req: Request, res: Response, next: NextFunction);
    updateSurveillanceTask(req: Request, res: Response, next: NextFunction);
    patchSurveillanceTask(req: Request, res: Response, next: NextFunction);
    listAllSurveillanceTasks(req: Request, res: Response, next: NextFunction);
    listAllPendingSurveillanceTasks(req: Request, res: Response, next: NextFunction);
    listAllApprovedSurveillanceTasks(req: Request, res: Response, next: NextFunction);
}