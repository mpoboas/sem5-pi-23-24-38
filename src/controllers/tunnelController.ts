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
            const tunnelOrError = (await this.tunnelServiceInstance.createTunnel(req.body as ITunnelDTO)) as Result<ITunnelDTO>;

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
            const tunnelOrError = (await this.tunnelServiceInstance.updateTunnel(req.body as ITunnelDTO)) as Result<ITunnelDTO>;

            if (tunnelOrError.isFailure) {
                return res.status(404).send();
            }

            const tunnelDTO = tunnelOrError.getValue();
            return res.status(201).json(tunnelDTO);
        } catch (e) {
            return next(e);
        }
    }
}
