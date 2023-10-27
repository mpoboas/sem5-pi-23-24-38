import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRobotController from '../../controllers/IControllers/IRobotController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/robots', route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

    route.post('',
        celebrate({
            body: Joi.object({
                nickname: Joi.string().required(),
                serialNr: Joi.string().required(),
                description: Joi.string().required(),
                isActive: Joi.boolean().required(),
                robotTypeId: Joi.string().required()
            })
        }),
        (req, res, next) => ctrl.createRobot(req, res, next) );

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                nickname: Joi.string().required(),
                serialNr: Joi.string().required(),
                description: Joi.string().required(),
                isActive: Joi.boolean().required(),
                robotTypeId: Joi.string().required()
            }),
        }),
        (req, res, next) => ctrl.updateRobot(req, res, next) );
};
