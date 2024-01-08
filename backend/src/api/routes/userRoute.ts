import { Router } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import IUserController from '../../controllers/IControllers/IUserController';

import config from '../../../config';
import { isAuth /*, authorizeRole*/ } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/auth', route);

  const ctrl = Container.get(config.controllers.user.name) as IUserController;

  route.post(
    '/signup',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        nif: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.signUp(req, res, next),
  );

  route.post(
    '/signin',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.signIn(req, res, next),
  );

  route.put(
    '/user/edit/:userId',
    isAuth,
    celebrate({
      params: Joi.object({
        userId: Joi.string().required(),
      }),
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        nif: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.editUser(req, res, next),
  );

  route.patch(
    '/user/patch/:userId',
    isAuth,
    celebrate({
      params: Joi.object({
        userId: Joi.string().required(),
      }),
      body: Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        role: Joi.string(),
        phoneNumber: Joi.string(),
        nif: Joi.string(),
      }),
    }),
    (req, res, next) => ctrl.patchUser(req, res, next),
  );

  route.delete('/user/delete/:userId', isAuth, (req, res, next) => ctrl.delete(req, res, next));

  /**
   * @TODO Let's leave this as a place holder for now
   * The reason for a logout route could be deleting a 'push notification token'
   * so the device stops receiving push notifications after logout.
   *
   * Another use case for advance/enterprise apps, you can store a record of the jwt token
   * emitted for the session and add it to a black list.
   * It's really annoying to develop that but if you had to, please use Redis as your data store
   
  route.post('/logout', middlewares.isAuth, (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger') as winston.Logger;
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, user_controller.getMe);*/

  route.get('/users', isAuth, (req, res, next) => ctrl.getAllUsers(req, res, next));
};
