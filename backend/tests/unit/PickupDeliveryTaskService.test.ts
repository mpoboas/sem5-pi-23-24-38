import config from '../../../config';
import PickupDeliveryTaskService from './PickupDeliveryTaskService';
import IPickupDeliveryTaskRepo from ' ../IRepos/IPickupDeliveryTaskRepo';
import IClassroomRepo from '../IRepos/IClassroomRepo';
import { Container } from 'typedi';

//substituir as implementações reais dos Repos - utilização de simulações dos repos para
//testar o serviço, isolando-o dos repositórios
jest.mock('../IRepos/IPickupDeliveryTaskRepo');
jest.mock('../IRepos/IClassroomRepo');

describe('PickupDeliveryTaskService', () => {
    //criar instancia do service
  let pickupDeliveryTaskService: PickupDeliveryTaskService;
    //instancias simuladas dos repositórios
  let pickupDeliveryTaskRepo: jest.Mocked<IPickupDeliveryTaskRepo>;
  let classroomRepo: jest.Mocked<IClassroomRepo>;

  beforeAll(() => {
    pickupDeliveryTaskRepo = new (IPickupDeliveryTaskRepo as any)();
    classroomRepo = new (IClassroomRepo as any)();
    Container.set(config.repos.pickupDeliveryTask.name, pickupDeliveryTaskRepo);
    Container.set(config.repos.classroom.name, classroomRepo);
  });

  beforeEach(() => {
    pickupDeliveryTaskService = new PickupDeliveryTaskService(
      Container.get(config.repos.pickupDeliveryTask.name),
      Container.get(config.repos.classroom.name),
    );
  });

  //testar o método getPickupDeliveryTask
  describe('getPickupDeliveryTask', () => {
    //1º teste: testa se o método getPickupDeliveryTask retorna um valor
    //igual ao do DTO esperado - caso em que a tarefa existe
    it('should return a pickup delivery task DTO if the task exists', async () => {
      // Arrange
      const taskId = 'existingTaskId';
      const existingTaskDTO = { id: taskId, pickupClassroom: 'existingPickupClassroomId', deliveryClassroom: 'existingDeliveryClassroomId',
      pickupContact: 'existingPickupContact', deliveryContact: 'existingDeliveryContact', confirmationCode: 1234, deliveryDescription: 'existingDeliveryDescription', isPending: true,
      isApproved : null };
      pickupDeliveryTaskRepo.findByDomainId.mockResolvedValueOnce(existingTaskDTO);

      // Act
      const result = await pickupDeliveryTaskService.getPickupDeliveryTask(taskId);

      // Assert
      expect(result.isSuccess).toBeTruthy();
      expect(result.getValue()).toEqual(existingTaskDTO);
    });

    //2º teste: testa se o método getPickupDeliveryTask retorna um erro
    //caso em que a tarefa não existe
    it('should return a failure result if the task does not exist', async () => {
      
      const taskId = 'nonExistentTaskId';
      pickupDeliveryTaskRepo.findByDomainId.mockResolvedValueOnce(null);

      // Act
      const result = await pickupDeliveryTaskService.getPickupDeliveryTask(taskId);

      // Assert
      expect(result.isFailure).toBeTruthy();
      expect(result.errorValue()).toEqual('PickupDeliveryTask not found');
    });
    
  });

  describe('createPickupDeliveryTask', () => {
    it('should create a pickup delivery task when all required data is provided', async () => {
        
        const taskId = 'existingTaskId';
        const taskDTO = { id: taskId, pickupClassroom: 'existingPickupClassroomId', deliveryClassroom: 'existingDeliveryClassroomId',
        pickupContact: 'existingPickupContact', deliveryContact: 'existingDeliveryContact', confirmationCode: 1234, deliveryDescription: 'existingDeliveryDescription', isPending: true,
        isApproved : null };
        
        
        const result = await pickupDeliveryTaskService.createPickupDeliveryTask(taskDTO);
      
     
        expect(result.isSuccess).toBeTruthy();
        expect(result.getValue()).toBeDefined();
      
      });
      
      it('should throw an error if pickup or delivery classroom ID is missing', async () => {

        const taskDTO = { id: null, pickupClassroom: 'existingPickupClassroomId', deliveryClassroom: 'existingDeliveryClassroomId',
        pickupContact: 'existingPickupContact', deliveryContact: 'existingDeliveryContact', confirmationCode: 1234, deliveryDescription: 'existingDeliveryDescription', isPending: true,
        isApproved : null };
        
        
        // Act & Assert
        await expect(pickupDeliveryTaskService.createPickupDeliveryTask(taskDTO)).rejects.toThrowError('Pickup Classroom ID is required');
        // Repeat for missing delivery classroom ID
      });
      
      it('should return a failure result if creating the pickup delivery task fails', async () => {
        const taskId = 'existingTaskId';
        const taskDTO = { id: taskId, pickupClassroom: 'existingPickupClassroomId', deliveryClassroom: 'existingDeliveryClassroomId',
        pickupContact: 'existingPickupContact', deliveryContact: 'existingDeliveryContact', confirmationCode: 1234, deliveryDescription: 'existingDeliveryDescription', isPending: true,
        isApproved : null };

        jest.spyOn(PickupDeliveryTask, 'create').mockReturnValueOnce(Result.fail('Creation failed'));
        
        // Act
        const result = await pickupDeliveryTaskService.createPickupDeliveryTask(taskDTO);
      
        // Assert
        expect(result.isFailure).toBeTruthy();
        expect(result.errorValue()).toEqual('Creation failed');
      });

  
    });
function expect(isSuccess: any) {
    throw new Error('Function not implemented.');
}

