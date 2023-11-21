import { Result } from "../../core/logic/Result";
import IClassroomDTO from "../../dto/IClassroomDTO";

export default interface IClassroomService {
    createClassroom(classroomDTO: IClassroomDTO): Promise<Result<IClassroomDTO>>;
    updateClassroom(classroomDTO: IClassroomDTO): Promise<Result<IClassroomDTO>>;
    getAllClassrooms(): Promise<IClassroomDTO[]>;

  }