import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITunnelController from '../../controllers/IControllers/ITunnelController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/tunnels', route);

    const ctrl = Container.get(config.controllers.tunnel.name) as ITunnelController;

    route.post('',
        celebrate({
            body: Joi.object({
                description: Joi.string().required(),
                floor1Id: Joi.string().required(),
                floor2Id: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createTunnel(req, res, next) );

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                description: Joi.string().required(),
                floor1Id: Joi.string().required(),
                floor2Id: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.updateTunnel(req, res, next) );
};
