import { Service, Inject } from 'typedi';
import config from '../../../config';
import { Result } from '../../core/logic/Result';
import IPickupDeliveryTaskDTO from '../../dto/IPickupDeliveryTaskDTO';
import IPickupDeliveryTaskRepo from '../IRepos/IPickupDeliveryTaskRepo';
import IPickupDeliveryTaskService from '../IServices/IPickupDeliveryTaskService';
import { PickupDeliveryTaskMap } from '../../mappers/PickupDeliveryTaskMap';
import IClassroomRepo from '../IRepos/IClassroomRepo';
import { PickupDeliveryTask } from '../../domain/pickupDeliveryTask/pickupDeliveryTask';
import { DeliveryDescription } from '../../domain/pickupDeliveryTask/deliveryDescription';

@Service()
export default class PickupDeliveryTaskService implements IPickupDeliveryTaskService {
    constructor(
        @Inject(config.repos.pickupDeliveryTask.name) private pickupDeliveryTaskRepo: IPickupDeliveryTaskRepo,
        @Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo,
    ) {}

    public async getPickupDeliveryTask(pickupDeliveryTaskId: string): Promise<Result<IPickupDeliveryTaskDTO>> {
        try {
            const task = await this.pickupDeliveryTaskRepo.findByDomainId(pickupDeliveryTaskId);

            if (task === null) {
                return Result.fail<IPickupDeliveryTaskDTO>('PickupDeliveryTask not found');
            } else {
                const pickupDeliveryTaskDTOResult = PickupDeliveryTaskMap.toDTO(task) as IPickupDeliveryTaskDTO;
                return Result.ok<IPickupDeliveryTaskDTO>(pickupDeliveryTaskDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createPickupDeliveryTask(taskDTO: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>> {
        try {
          const pickupClassroomId = taskDTO.pickupClassroom;
          const deliveryClassroomId = taskDTO.deliveryClassroom;
          if (pickupClassroomId == null) {
            throw new Error('Pickup Classroom ID is required');
          }
          if (deliveryClassroomId == null) {
            throw new Error('Delivery Classroom ID is required');
          }

          const pickupClassroom = await this.classroomRepo.findByDomainId(pickupClassroomId);
          const deliveryClassroom = await this.classroomRepo.findByDomainId(deliveryClassroomId);
          if (pickupClassroom == null) {
              throw new Error('Pickup Classroom not found');
          }
          if (deliveryClassroom == null) {
            throw new Error('Delivery Classroom not found');
          }
    
          const taskrOrError = await PickupDeliveryTask.create(taskDTO);
    
          if (taskrOrError.isFailure) {
            const errorMessage = taskrOrError.errorValue();
            return Result.fail<IPickupDeliveryTaskDTO>(errorMessage);
          }
    
          const taskResult = taskrOrError.getValue();
    
          await this.pickupDeliveryTaskRepo.save(taskResult);
    
          const taskDTOResult = PickupDeliveryTaskMap.toDTO(taskResult) as IPickupDeliveryTaskDTO;
          return Result.ok<IPickupDeliveryTaskDTO>(taskDTOResult);
        } catch (error) {
          throw new Error(`Error creating pickup delivery task: ${error.message}`);
        }
    }

    public async updatePickupDeliveryTask(taskDTO: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>> {
        try {
            const task = await this.pickupDeliveryTaskRepo.findByDomainId(taskDTO.id);

            if (task === null) {
                return Result.fail<IPickupDeliveryTaskDTO>('PickupDeliveryTask not found');
            } else {
                const pickupClassroom = await this.classroomRepo.findByDomainId(taskDTO.pickupClassroom);
                const deliveryClassroom = await this.classroomRepo.findByDomainId(taskDTO.deliveryClassroom);
                if (pickupClassroom == null) {
                    throw new Error('Pickup Classroom not found');
                } else {
                    task.pickupClassroom = taskDTO.pickupClassroom;
                }
                if (deliveryClassroom == null) {
                    throw new Error('Delivery Classroom not found');
                } else {
                    task.deliveryClassroom = taskDTO.deliveryClassroom;
                }
                task.pickupContact = taskDTO.pickupContact;
                task.deliveryContact = taskDTO.deliveryContact;
                task.confirmationCode = taskDTO.confirmationCode;
                task.deliveryDescription = DeliveryDescription.create(taskDTO.deliveryDescription).getValue().description;
                task.isPending = taskDTO.isPending;
                task.isApproved = taskDTO.isApproved;

                await this.pickupDeliveryTaskRepo.save(task);

                const taskDTOResult = PickupDeliveryTaskMap.toDTO(task) as IPickupDeliveryTaskDTO;
                return Result.ok<IPickupDeliveryTaskDTO>(taskDTOResult);
            }
        } catch (error) {
            throw new Error(`Error updating pickup delivery task: ${error.message}`);
        }
    }

    public async patchPickupDeliveryTask(pickupDeliveryTaskId: string, pickupDeliveryTaskUpdate: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>>{
        try {
            const task = await this.pickupDeliveryTaskRepo.findByDomainId(pickupDeliveryTaskId);

            if (task === null) {
                return Result.fail<IPickupDeliveryTaskDTO>('Pickup Delivery Task not found');
            } 
            
            if (pickupDeliveryTaskUpdate.pickupClassroom) {
                const pickupClassroom = await this.classroomRepo.findByDomainId(pickupDeliveryTaskUpdate.pickupClassroom);
                if (pickupClassroom == null) {
                    throw new Error('Pickup Classroom not found');
                } else {
                    task.pickupClassroom = pickupDeliveryTaskUpdate.pickupClassroom;
                }
            }
            if (pickupDeliveryTaskUpdate.deliveryClassroom) {
                const deliveryClassroom = await this.classroomRepo.findByDomainId(pickupDeliveryTaskUpdate.deliveryClassroom);
                if (deliveryClassroom == null) {
                    throw new Error('Delivery Classroom not found');
                } else {
                    task.deliveryClassroom = pickupDeliveryTaskUpdate.deliveryClassroom;
                }
            }
            if (pickupDeliveryTaskUpdate.pickupContact) {
                task.pickupContact = pickupDeliveryTaskUpdate.pickupContact;
            }
            if (pickupDeliveryTaskUpdate.deliveryContact) {
                task.deliveryContact = pickupDeliveryTaskUpdate.deliveryContact;
            }
            if (pickupDeliveryTaskUpdate.confirmationCode) {
                task.confirmationCode = pickupDeliveryTaskUpdate.confirmationCode;
            }
            if (pickupDeliveryTaskUpdate.deliveryDescription) {
                task.deliveryDescription = DeliveryDescription.create(pickupDeliveryTaskUpdate.deliveryDescription).getValue().description;
            }
            if (pickupDeliveryTaskUpdate.isPending) {
                task.isPending = pickupDeliveryTaskUpdate.isPending;
                console.log('The task is pending: ' + task.isPending + " and now will be: "+ pickupDeliveryTaskUpdate.isPending);
            }
            if (pickupDeliveryTaskUpdate.isApproved) {
                task.isApproved = pickupDeliveryTaskUpdate.isApproved;
                console.log('The task is approved: ' + task.isApproved + " and now will be: "+ pickupDeliveryTaskUpdate.isApproved);
            }

            await this.pickupDeliveryTaskRepo.save(task);

            const pickupDeliveryTaskDTOResult = PickupDeliveryTaskMap.toDTO(task) as IPickupDeliveryTaskDTO;
            return Result.ok<IPickupDeliveryTaskDTO>(pickupDeliveryTaskDTOResult);
        } catch (error) {
            throw new Error(`Error patching pickup delivery task: ${error.message}`);
        }
    }

    public async getAllPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]> {
        try {
            const tasks = await this.pickupDeliveryTaskRepo.getAllPickupDeliveryTasks();

            return tasks.map(task => {
                const taskDTOResult = PickupDeliveryTaskMap.toDTO(task) as IPickupDeliveryTaskDTO;
                return taskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching pickup delivery tasks: ${error.message}`);
        }
    }

    public async getAllPendingPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]> {
        try {
            const tasks = await this.pickupDeliveryTaskRepo.getAllPickupDeliveryTasks();
            const pendingTasks: any[] = [];
            tasks.forEach(task => {
                if (task.isPending) {
                    pendingTasks.push(task);
                }
            });

            return pendingTasks.map(pendingTask => {
                const pendingTaskDTOResult = PickupDeliveryTaskMap.toDTO(pendingTask) as IPickupDeliveryTaskDTO;
                return pendingTaskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching pending pickup delivery tasks: ${error.message}`);
        }
    }

    public async getAllApprovedPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]> {
        try {
            const tasks = await this.pickupDeliveryTaskRepo.getAllPickupDeliveryTasks();
            const approvedTasks: any[] = [];
            tasks.forEach(task => {
                if (task.isApproved) {
                    approvedTasks.push(task);
                }
            });

            return approvedTasks.map(approvedTask => {
                const approvedTaskDTOResult = PickupDeliveryTaskMap.toDTO(approvedTask) as IPickupDeliveryTaskDTO;
                return approvedTaskDTOResult;
              });
        } catch (error) {
            throw new Error(`Error fetching approved pickup delivery tasks: ${error.message}`);
        }
    }
}