import { Repo } from '../../core/infra/Repo';
import { PickupDeliveryTask } from "../../domain/pickupDeliveryTask/pickupDeliveryTask";
import { PickupDeliveryTaskId } from '../../domain/pickupDeliveryTask/pickupDeliveryTaskID';

export default interface IPickupDeliveryTaskRepo extends Repo<PickupDeliveryTask>{
    save(pickupDeliveryTask: PickupDeliveryTask): Promise<PickupDeliveryTask>;
    findByDomainId(pickupDeliveryTaskId: PickupDeliveryTaskId | string): Promise<PickupDeliveryTask>
    getAllPickupDeliveryTasks(): Promise<PickupDeliveryTask[]>;
}