import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IBuildingController from '../../controllers/IControllers/IBuildingController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/buildings', route);

    const ctrl = Container.get(config.controllers.building.name) as IBuildingController;

    route.post('',
        celebrate({
            body: Joi.object({
                letter: Joi.string().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                description: Joi.string(),
                code: Joi.string().required(),
                floors: Joi.array().items(Joi.string()).required()
            })
        }),
        (req, res, next) => ctrl.createBuilding(req, res, next) );

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                letter: Joi.string().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                description: Joi.string(),
                code: Joi.string().required(),
                floors: Joi.array().items(Joi.string()).required()
            })
        }),
        (req, res, next) => ctrl.updateBuilding(req, res, next) );

    route.get('', (req, res, next) => ctrl.listAllBuildings(req, res, next) );
};
