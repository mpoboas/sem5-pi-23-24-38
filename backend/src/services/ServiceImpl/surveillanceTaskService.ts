import { Service, Inject } from 'typedi';
import config from '../../../config';
import { Result } from '../../core/logic/Result';
import ISurveillanceTaskDTO from '../../dto/ISurveillanceTaskDTO';
import ISurveillanceTaskRepo from '../IRepos/ISurveillanceTaskRepo';
import ISurveillanceTaskService from '../IServices/ISurveillanceTaskService';
import { SurveillanceTaskMap } from '../../mappers/SurveillanceTaskMap';
import IBuildingRepo from '../IRepos/IBuildingRepo';
import IFloorRepo from '../IRepos/IFloorRepo';

@Service()
export default class SurveillanceTaskService implements ISurveillanceTaskService {
    constructor(
        @Inject(config.repos.surveillanceTask.name) private surveillanceTaskRepo: ISurveillanceTaskRepo,
        @Inject(config.repos.building.name) private buildingRepo: IBuildingRepo,
        @Inject(config.repos.floor.name) private floorRepo: IFloorRepo,
    ) {}

    public async getSurveillanceTask(surveillanceTaskId: string): Promise<Result<ISurveillanceTaskDTO>> {
        try {
            const task = await this.surveillanceTaskRepo.findByDomainId(surveillanceTaskId);

            if (task === null) {
                return Result.fail<ISurveillanceTaskDTO>('SurveillanceTask not found');
            } else {
                const surveillanceTaskDTOResult = SurveillanceTaskMap.toDTO(task) as ISurveillanceTaskDTO;
                return Result.ok<ISurveillanceTaskDTO>(surveillanceTaskDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createSurveillanceTask(taskDTO: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>> {
        try {
          const buildingId = taskDTO.building;
          if (buildingId == null) {
            throw new Error('Building ID is required');
          }
        
          const building = await this.buildingRepo.findByDomainId(buildingId);
          if (building == null) {
              throw new Error('Building not found');
          }

          const floorsB = await this.floorRepo.findFloorsByBuildingId(buildingId);

          if (floorsB === null) {
              return Result.fail<ISurveillanceTaskDTO>('Floors not found');
          }

          const floors: string[] = [];

          taskDTO.floors.forEach(floor => {
              const floor2 = floorsB.find(floorB => floorB.id.toString() === floor);
              if (!floor2) {
                throw new ReferenceError('Floor not found');
              }
              floors.push(floor2.id.toString());
          });

          const task = await SurveillanceTaskMap.toDomain(taskDTO);
    
          const taskCreated = await this.surveillanceTaskRepo.save(task);
    
          const taskDTOResult = SurveillanceTaskMap.toDTO(taskCreated) as ISurveillanceTaskDTO;
          return Result.ok<ISurveillanceTaskDTO>(taskDTOResult);
        } catch (error) {
          throw new Error(`Error creating surveillance task: ${error.message}`);
        }
    }

    public async updateSurveillanceTask(taskDTO: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>> {
        try {
            const task = await this.surveillanceTaskRepo.findByDomainId(taskDTO.id);

            if (task === null) {
                return Result.fail<ISurveillanceTaskDTO>('SurveillanceTask not found');
            } else {
                
                const building = await this.buildingRepo.findByDomainId(taskDTO.building);
                if (building == null) {
                    throw new Error('Building not found');
                } else {
                    task.building = taskDTO.building;
                }

                const floorsB = await this.floorRepo.findFloorsByBuildingId(taskDTO.building);

                if (floorsB === null) {
                    return Result.fail<ISurveillanceTaskDTO>('Floors not found');
                }

                const floors: any[] = [];

                taskDTO.floors.forEach(floor => {
                    const floor2 = floorsB.find(floorB => floorB.id.toString() === floor);
                    if (!floor2) {
                        throw new ReferenceError('Floor not found');
                    }
                    floors.push(floor2);
                });
                task.floors = floors;
                task.emergencyContact = taskDTO.emergencyContact;
                task.isPending = taskDTO.isPending;
                task.isApproved = taskDTO.isApproved;

                await this.surveillanceTaskRepo.save(task);

                const taskDTOResult = SurveillanceTaskMap.toDTO(task) as ISurveillanceTaskDTO;
                return Result.ok<ISurveillanceTaskDTO>(taskDTOResult);
            }
        } catch (error) {
            throw new Error(`Error updating surveillance task: ${error.message}`);
        }
    }

    public async patchSurveillanceTask(surveillanceTaskId: string, surveillanceTaskUpdate: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>>{
        try {
            const task = await this.surveillanceTaskRepo.findByDomainId(surveillanceTaskId);

            if (task === null) {
                return Result.fail<ISurveillanceTaskDTO>('Surveillance Task not found');
            } 
            
            if (surveillanceTaskUpdate.building) {
                const building = await this.buildingRepo.findByDomainId(surveillanceTaskUpdate.building);
                if (building == null) {
                    throw new Error('Pickup Classroom not found');
                } else {
                    task.building = surveillanceTaskUpdate.building;
                }
            }
            if (surveillanceTaskUpdate.floors){
                const floorsB = await this.floorRepo.findFloorsByBuildingId(surveillanceTaskUpdate.building);

                if (floorsB === null) {
                    return Result.fail<ISurveillanceTaskDTO>('Floors not found');
                }

                const floors: any[] = [];

                surveillanceTaskUpdate.floors.forEach(floor => {
                    const floor2 = floorsB.find(floorB => floorB.id.toString() === floor);
                    if (!floor2) {
                        throw new ReferenceError('Floor not found');
                    }
                    floors.push(floor2.id.toString());
                });
                task.floors = floors;
            }
            if (surveillanceTaskUpdate.emergencyContact) {
                task.emergencyContact = surveillanceTaskUpdate.emergencyContact;
            }
            if (surveillanceTaskUpdate.isPending !== null) {
                task.isPending = surveillanceTaskUpdate.isPending;
            }
            if (surveillanceTaskUpdate.isApproved !== null) {
                task.isApproved = surveillanceTaskUpdate.isApproved;
            }

            await this.surveillanceTaskRepo.save(task);

            const surveillanceTaskDTOResult = SurveillanceTaskMap.toDTO(task) as ISurveillanceTaskDTO;
            return Result.ok<ISurveillanceTaskDTO>(surveillanceTaskDTOResult);
        } catch (error) {
            throw new Error(`Error patching surveillance task: ${error.message}`);
        }
    }

    public async getAllSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]> {
        try {
            const tasks = await this.surveillanceTaskRepo.getAllSurveillanceTasks();

            return tasks.map(task => {
                const taskDTOResult = SurveillanceTaskMap.toDTO(task) as ISurveillanceTaskDTO;
                return taskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching surveillance tasks: ${error.message}`);
        }
    }

    public async getAllPendingSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]> {
        try {
            const tasks = await this.surveillanceTaskRepo.getAllSurveillanceTasks();
            const pendingTasks: any[] = [];
            tasks.forEach(task => {
                if (task.isPending) {
                    pendingTasks.push(task);
                }
            });

            return pendingTasks.map(pendingTask => {
                const pendingTaskDTOResult = SurveillanceTaskMap.toDTO(pendingTask) as ISurveillanceTaskDTO;
                return pendingTaskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching pending surveillance tasks: ${error.message}`);
        }
    }

    public async getAllApprovedSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]> {
        try {
            const tasks = await this.surveillanceTaskRepo.getAllSurveillanceTasks();
            const approvedTasks: any[] = [];
            tasks.forEach(task => {
                if (task.isApproved) {
                    approvedTasks.push(task);
                }
            });

            return approvedTasks.map(approvedTask => {
                const approvedTaskDTOResult = SurveillanceTaskMap.toDTO(approvedTask) as ISurveillanceTaskDTO;
                return approvedTaskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching approved surveillance tasks: ${error.message}`);
        }
    }
}