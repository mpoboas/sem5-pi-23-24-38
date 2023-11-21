import { Request, Response, NextFunction } from 'express';

export default interface ITunnelController {
  createTunnel(req: Request, res: Response, next: NextFunction);
  updateTunnel(req: Request, res: Response, next: NextFunction);
  patchTunnel(req: Request, res: Response, next: NextFunction);
  listAllTunnels(req: Request, res: Response, next: NextFunction);
  listTunnels2B(req: Request, res: Response, next: NextFunction);
}
