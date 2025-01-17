import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * Your mongo database
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    robotType: {
      name: 'RobotTypeController',
      path: '../controllers/robotTypeController',
    },
    building: {
      name: 'BuildingController',
      path: '../controllers/buildingController',
    },
    floor: {
      name: 'FloorController',
      path: '../controllers/floorController',
    },
    elevator: {
      name: 'ElevatorController',
      path: '../controllers/elevatorController',
    },
    robot: {
      name: 'RobotController',
      path: '../controllers/robotController',
    },
    classroom: {
      name: 'ClassroomController',
      path: '../controllers/classroomController',
    },
    tunnel: {
      name: 'TunnelController',
      path: '../controllers/tunnelController',
    },
    user: {
      name: 'UserController',
      path: '../controllers/userController',
    },
    pickupDeliveryTask: {
      name: 'PickupDeliveryTaskController',
      path: '../controllers/pickupDeliveryTaskController',
    },
    surveillanceTask: {
      name: 'SurveillanceTaskController',
      path: '../controllers/surveillanceTaskController',
    },
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    robotType: {
      name: 'RobotTypeRepo',
      path: '../repos/robotTypeRepo',
    },
    building: {
      name: 'BuildingRepo',
      path: '../repos/buildingRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    floor: {
      name: 'FloorRepo',
      path: '../repos/floorRepo',
    },
    elevator: {
      name: 'ElevatorRepo',
      path: '../repos/elevatorRepo',
    },
    robot: {
      name: 'RobotRepo',
      path: '../repos/robotRepo',
    },
    classroom: {
      name: 'ClassroomRepo',
      path: '../repos/classroomRepo',
    },
    tunnel: {
      name: 'TunnelRepo',
      path: '../repos/tunnelRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    pickupDeliveryTask: {
      name: 'PickupDeliveryTaskRepo',
      path: '../repos/pickupDeliveryTaskRepo',
    },
    surveillanceTask: {
      name: 'SurveillanceTaskRepo',
      path: '../repos/surveillanceTaskRepo',
    },
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/ServiceImpl/roleService',
    },
    robotType: {
      name: 'RobotTypeService',
      path: '../services/ServiceImpl/robotTypeService',
    },
    building: {
      name: 'BuildingService',
      path: '../services/ServiceImpl/buildingService',
    },
    floor: {
      name: 'FloorService',
      path: '../services/ServiceImpl/floorService',
    },
    elevator: {
      name: 'ElevatorService',
      path: '../services/ServiceImpl/elevatorService',
    },
    robot: {
      name: 'RobotService',
      path: '../services/ServiceImpl/robotService',
    },
    classroom: {
      name: 'ClassroomService',
      path: '../services/ServiceImpl/classroomService',
    },
    tunnel: {
      name: 'TunnelService',
      path: '../services/ServiceImpl/tunnelService',
    },
    user: {
      name: 'UserService',
      path: '../services/ServiceImpl/userService',
    },
    pickupDeliveryTask: {
      name: 'PickupDeliveryTaskService',
      path: '../services/ServiceImpl/pickupDeliveryTaskService',
    },
    surveillanceTask: {
      name: 'SurveillanceTaskService',
      path: '../services/ServiceImpl/surveillanceTaskService',
    },
  },
};
