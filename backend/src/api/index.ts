import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import robotType from './routes/robotTypeRoute';
import floor from './routes/floorRoute';
import elevator from './routes/elevatorRoute';
import robot from './routes/robotRoute';
import classroom from './routes/classroomRoute';
import tunnel from './routes/tunnelRoute';

export default () => {
  const app = Router();

  auth(app);
  user(app);
  role(app);
  building(app);
  robotType(app);
  robot(app);
  floor(app);
  elevator(app);
  classroom(app);
  tunnel(app);

  return app;
};
