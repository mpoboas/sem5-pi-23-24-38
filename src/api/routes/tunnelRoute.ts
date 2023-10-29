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

    route.patch('/:id',
        celebrate({
                params: Joi.object({
                    id: Joi.string().required()
                }),
                body: Joi.object({
                    description: Joi.string(),
                    floor1Id: Joi.string(),
                    floor2Id: Joi.string()
                }),
            }),
        (req, res, next) => ctrl.patchTunnel(req, res, next) );

    route.get('',(req, res, next) => ctrl.listAllTunnels(req, res, next));
    route.get('/:ids',(req,res,next)=> ctrl.listTunnels2B(req, res, next));
};
