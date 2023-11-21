import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';



export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and servicesasdasdasd
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const tunnelSchema = {
    // compare with the approach followed in repos and services
    name: 'tunnelSchema',
    schema: '../persistence/schemas/tunnelSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const buildingSchema = {
    // compare with the approach followed in repos and services
    name: 'buildingSchema',
    schema: '../persistence/schemas/buildingSchema',
  };

  const robotTypeSchema = {
    // compare with the approach followed in repos and services
    name: 'robotTypeSchema',
    schema: '../persistence/schemas/robotTypeSchema',
  };

  const floorSchema = {
    // compare with the approach followed in repos and services
    name: 'floorSchema',
    schema: '../persistence/schemas/floorSchema',
  };

  const elevatorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevatorSchema',
    schema: '../persistence/schemas/elevatorSchema',
  };

  const classroomSchema = {
    // compare with the approach followed in repos and services
    name: 'classroomSchema',
    schema: '../persistence/schemas/classroomSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const tunnelController = {
    name: config.controllers.tunnel.name,
    path: config.controllers.tunnel.path
  }

  const tunnelRepo = {
    name: config.repos.tunnel.name,
    path: config.repos.tunnel.path
  }

  const robotTypeController = {
    name: config.controllers.robotType.name,
    path: config.controllers.robotType.path
  }

  const robotTypeRepo = {
    name: config.repos.robotType.name,
    path: config.repos.robotType.path
  }

  const buildingController = {
    name: config.controllers.building.name,
    path: config.controllers.building.path
  }

  const buildingRepo = {
    name: config.repos.building.name,
    path: config.repos.building.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const floorController = {
    name: config.controllers.floor.name,
    path: config.controllers.floor.path
  };

  const floorRepo = {
    name: config.repos.floor.name,
    path: config.repos.floor.path
  };

  const elevatorController = {
    name: config.controllers.elevator.name,
    path: config.controllers.elevator.path
  };

  const elevatorRepo = {
    name: config.repos.elevator.name,
    path: config.repos.elevator.path
  };

  const classroomController = {
    name: config.controllers.classroom.name,
    path: config.controllers.classroom.path
  };

  const classroomRepo = {
    name: config.repos.classroom.name,
    path: config.repos.classroom.path
  };
  
  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const tunnelService = {
    name: config.services.tunnel.name,
    path: config.services.tunnel.path
  }

  const robotTypeService = {
    name: config.services.robotType.name,
    path: config.services.robotType.path
  }

  const buildingService = {
    name: config.services.building.name,
    path: config.services.building.path
  }

  const floorService = {
    name: config.services.floor.name,
    path: config.services.floor.path
  };

  const elevatorService = {
    name: config.services.elevator.name,
    path: config.services.elevator.path
  };

  const classroomService = {
    name: config.services.classroom.name,
    path: config.services.classroom.path
  };

  const robotSchema = {
    // compare with the approach followed in repos and services
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
  };

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      buildingSchema,
      robotTypeSchema,
      floorSchema,
      elevatorSchema,
      robotSchema,
      classroomSchema,
      tunnelSchema
    ],
    controllers: [
      roleController,
      robotTypeController,
      buildingController,
      floorController,
      elevatorController,
      robotController,
      classroomController,
      tunnelController
    ],
    repos: [
      roleRepo,
      userRepo,
      buildingRepo,
      robotTypeRepo,
      floorRepo,
      elevatorRepo,
      robotRepo,
      classroomRepo,
      tunnelRepo
    ],
    services: [
      roleService,
      robotTypeService,
      buildingService,
      floorService,
      elevatorService,
      robotService,
      classroomService,
      tunnelService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
