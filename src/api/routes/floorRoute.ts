import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IFloorController from '../../controllers/IControllers/IFloorController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/floors', route);

    const ctrl = Container.get(config.controllers.floor.name) as IFloorController;

    route.post('',
        celebrate({
            body: Joi.object({
                floorNumber: Joi.string().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                description: Joi.string().required(),
                buildingId: Joi.string().required(),
            })
        }),
        (req, res, next) => ctrl.createFloor(req, res, next) );

    route.put('',
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                floorNumber: Joi.string().required(),
                length: Joi.number().required(),
                width: Joi.number().required(),
                description: Joi.string().required(),
                buildingId: Joi.string().required(),
            })
        }),
        (req, res, next) => ctrl.updateFloor(req, res, next) );

    route.patch('/:id',
    celebrate({
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            floorNumber: Joi.string(),
            length: Joi.number(),
            width: Joi.number(),
            description: Joi.string(),
            buildingId: Joi.string(),
        }),
    }),
    (req, res, next) => ctrl.patchFloor(req, res, next) );

    route.get('', (req, res, next) =>  ctrl.listAllFloors(req, res, next));

    route.get('/:buildingId', (req, res, next) =>  ctrl.listAllFloorsInBuilding(req, res, next));

    route.get('/byNumber/:floorNumber', (req, res, next) => ctrl.findFloorByNumber(req, res, next))

    route.get('/getFloorNum/:id', (req, res, next) => ctrl.findFloorNum(req, res, next))

};
