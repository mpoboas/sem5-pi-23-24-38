import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPickupDeliveryTaskController from '../../controllers/IControllers/IPickupDeliveryTaskController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
    app.use('/pickup-delivery-tasks', route);

    const ctrl = Container.get(config.controllers.pickupDeliveryTask.name) as IPickupDeliveryTaskController;

    route.post(
        '',
        isAuth,
        authorizeRole([Role.ADMIN, Role.TASK_MANAGER, Role.STUDENT, Role.TEACHER, Role.USER]),
        celebrate({
            body: Joi.object({
                pickupClassroom: Joi.string().required(),
                deliveryClassroom: Joi.string().required(),
                pickupContact: Joi.string().required(),
                deliveryContact: Joi.string().required(),
                confirmationCode: Joi.number().required(),
                deliveryDescription: Joi.string().required(),
                isPending: Joi.boolean().required(),
                isApproved: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.createPickupDeliveryTask(req, res, next),
    );

    route.put(
        '',
        isAuth,
        authorizeRole([Role.ADMIN, Role.TASK_MANAGER]),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                pickupClassroom: Joi.string().required(),
                deliveryClassroom: Joi.string().required(),
                pickupContact: Joi.string().required(),
                deliveryContact: Joi.string().required(),
                confirmationCode: Joi.number().required(),
                deliveryDescription: Joi.string().required(),
                isPending: Joi.boolean().required(),
                isApproved: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.updatePickupDeliveryTask(req, res, next),
    );

    route.patch(
        '/:id',
        isAuth,
        authorizeRole([Role.ADMIN, Role.TASK_MANAGER]),
        celebrate({
            params: Joi.object({
                id: Joi.string().required(),
            }),
            body: Joi.object({
                pickupClassroom: Joi.string(),
                deliveryClassroom: Joi.string(),
                pickupContact: Joi.string(),
                deliveryContact: Joi.string(),
                confirmationCode: Joi.number(),
                deliveryDescription: Joi.string(),
                isPending: Joi.boolean(),
                isApproved: Joi.boolean(),
            }),
        }),
        (req, res, next) => ctrl.patchPickupDeliveryTask(req, res, next),
    );

    route.get('', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllPickupDeliveryTasks(req, res, next));
    route.get('/pending', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllPendingPickupDeliveryTasks(req, res, next));
    route.get('/approved', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllApprovedPickupDeliveryTasks(req, res, next));
}