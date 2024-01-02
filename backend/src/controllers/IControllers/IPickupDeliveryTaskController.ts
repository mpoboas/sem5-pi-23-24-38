import { Request, Response, NextFunction } from 'express';

export default interface IPickupDeliveryTaskController {
    createPickupDeliveryTask(req: Request, res: Response, next: NextFunction);
    updatePickupDeliveryTask(req: Request, res: Response, next: NextFunction);
    patchPickupDeliveryTask(req: Request, res: Response, next: NextFunction);
    listAllPickupDeliveryTasks(req: Request, res: Response, next: NextFunction);
    listAllPendingPickupDeliveryTasks(req: Request, res: Response, next: NextFunction);
    listAllApprovedPickupDeliveryTasks(req: Request, res: Response, next: NextFunction);
}