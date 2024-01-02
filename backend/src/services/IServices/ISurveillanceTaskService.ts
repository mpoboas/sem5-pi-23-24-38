import { Result } from '../../core/logic/Result';
import ISurveillanceTaskDTO from '../../dto/ISurveillanceTaskDTO';

export default interface ISurveillanceTaskService {
    createSurveillanceTask(SurveillanceTaskDTO: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>>;
    updateSurveillanceTask(surveillanceTaskDTO: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>>;
    patchSurveillanceTask(surveillanceTaskId: string, surveillanceTaskUpdate: ISurveillanceTaskDTO): Promise<Result<ISurveillanceTaskDTO>>;
    getAllSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]>;
    getSurveillanceTask(surveillanceTaskId: string): Promise<Result<ISurveillanceTaskDTO>>;
    getAllPendingSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]>;
    getAllApprovedSurveillanceTasks(): Promise<ISurveillanceTaskDTO[]>;
}