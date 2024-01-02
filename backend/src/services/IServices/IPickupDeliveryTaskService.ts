import { Result } from '../../core/logic/Result';
import IPickupDeliveryTaskDTO from '../../dto/IPickupDeliveryTaskDTO';

export default interface IPickupDeliveryTaskService {
    createPickupDeliveryTask(pickupDeliveryTaskDTO: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>>;
    updatePickupDeliveryTask(pickupDeliveryTaskDTO: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>>;
    patchPickupDeliveryTask(pickupDeliveryTaskId: string, pickupDeliveryTaskUpdate: IPickupDeliveryTaskDTO): Promise<Result<IPickupDeliveryTaskDTO>>;
    getAllPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]>;
    getPickupDeliveryTask(pickupDeliveryTaskId: string): Promise<Result<IPickupDeliveryTaskDTO>>;
    getAllPendingPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]>;
    getAllApprovedPickupDeliveryTasks(): Promise<IPickupDeliveryTaskDTO[]>;
}