import { Request, Response, NextFunction } from 'express';

export default interface ITunnelController  {
    createTunnel(req: Request, res: Response, next: NextFunction);
    updateTunnel(req: Request, res: Response, next: NextFunction);
    patchTunnel(req: Request, res: Response, next: NextFunction);
}
