import { Repo } from '../../core/infra/Repo';
import { SurveillanceTask } from "../../domain/surveillanceTask/surveillanceTask";
import { SurveillanceTaskId } from '../../domain/surveillanceTask/surveillanceTaskID';

export default interface ISurveillanceTaskRepo extends Repo<SurveillanceTask>{
    save(pickupDeliveryTask: SurveillanceTask): Promise<SurveillanceTask>;
    findByDomainId(pickupDeliveryTaskId: SurveillanceTaskId | string): Promise<SurveillanceTask>
    getAllSurveillanceTasks(): Promise<SurveillanceTask[]>;
}