import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISurveillanceTaskController from '../../controllers/IControllers/ISurveillanceTaskController';

import config from '../../../config';
import { isAuth, authorizeRole } from '../middlewares/isAuth';
import { Role } from '../../domain/role/role.enum';

const route = Router();

export default (app: Router) => {
    app.use('/surveillance-tasks', route);

    const ctrl = Container.get(config.controllers.surveillanceTask.name) as ISurveillanceTaskController;

    route.post(
        '',
        isAuth,
        authorizeRole([Role.ADMIN, Role.TASK_MANAGER, Role.STUDENT, Role.TEACHER, Role.USER]),
        celebrate({
            body: Joi.object({
                building: Joi.string().required(),
                floors: Joi.array().items(Joi.string()).required(),
                emergencyContact: Joi.string().required(),
                isPending: Joi.boolean().required(),
                isApproved: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.createSurveillanceTask(req, res, next),
    );

    route.put(
        '',
        isAuth,
        authorizeRole([Role.ADMIN, Role.TASK_MANAGER]),
        celebrate({
            body: Joi.object({
                id: Joi.string().required(),
                building: Joi.string().required(),
                floors: Joi.array().items(Joi.string()).required(),
                emergencyContact: Joi.string().required(),
                isPending: Joi.boolean().required(),
                isApproved: Joi.boolean().required(),
            }),
        }),
        (req, res, next) => ctrl.updateSurveillanceTask(req, res, next),
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
                building: Joi.string(),
                floors: Joi.array().items(Joi.string()),
                emergencyContact: Joi.string(),
                isPending: Joi.boolean(),
                isApproved: Joi.boolean(),
            }),
        }),
        (req, res, next) => ctrl.patchSurveillanceTask(req, res, next),
    );

    route.get('', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllSurveillanceTasks(req, res, next));
    route.get('/pending', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllPendingSurveillanceTasks(req, res, next));
    route.get('/approved', isAuth, authorizeRole([Role.ADMIN, Role.TASK_MANAGER]), (req, res, next) => ctrl.listAllApprovedSurveillanceTasks(req, res, next));
}