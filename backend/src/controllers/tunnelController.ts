import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITunnelController from './IControllers/ITunnelController';
import ITunnelService from '../services/IServices/ITunnelService';
import ITunnelDTO from '../dto/ITunnelDTO';

import { Result } from '../core/logic/Result';

@Service()
export default class TunnelController implements ITunnelController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.tunnel.name) private tunnelServiceInstance: ITunnelService) {}

  public async createTunnel(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnelOrError = (await this.tunnelServiceInstance.createTunnel(req.body as ITunnelDTO)) as Result<
        ITunnelDTO
      >;

      if (tunnelOrError.isFailure) {
        return res.status(402).send();
      }

      const tunnelDTO = tunnelOrError.getValue();
      return res.json(tunnelDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateTunnel(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnelOrError = (await this.tunnelServiceInstance.updateTunnel(req.body as ITunnelDTO)) as Result<
        ITunnelDTO
      >;

      if (tunnelOrError.isFailure) {
        return res.status(404).send();
      }

      const tunnelDTO = tunnelOrError.getValue();
      return res.status(201).json(tunnelDTO);
    } catch (e) {
      return next(e);
    }
  }
  public async patchTunnel(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnelId = req.params.id;
      const tunnelUpdate: ITunnelDTO = req.body;

      const existingTunnel = await this.tunnelServiceInstance.getTunnel(tunnelId);
      if (!existingTunnel) {
        return res.status(404).send();
      }
      const updatedTunnel = await this.tunnelServiceInstance.patchTunnel(tunnelId, tunnelUpdate);

      return res.status(200).json(updatedTunnel);
    } catch (e) {
      return next(e);
    }
  }
  public async listAllTunnels(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnels = await this.tunnelServiceInstance.getAllTunnelsFloors();
      return res.json(tunnels).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async listTunnels2B(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnels = await this.tunnelServiceInstance.getTunnels2B();
      return res.json(tunnels).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getTunnelsAlgav(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnels = await this.tunnelServiceInstance.getTunnelsAlgav();
      return res.json(tunnels).status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getTunnelsAlgav2(req: Request, res: Response, next: NextFunction) {
    try {
      const tunnels = await this.tunnelServiceInstance.getTunnelsAlgav2();
      return res.json(tunnels).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
