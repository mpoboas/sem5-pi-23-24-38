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
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://mongoadmin:adf7bbeb124241cbbf34a97a@vs1088.dei.isep.ipp.pt:27017/admin?authMechanism=DEFAULT',

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
    robotType: { // duplicated role changed to robotType
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
    }
  },

  repos: {
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    robotType: { // duplicated role changed to robotType
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
    }
  },

  services: {
    role: {
      name: 'RoleService',
      path: '../services/ServiceImpl/roleService',
    },
    robotType: { // duplicated role changed to robotType
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
    }
  },
};
