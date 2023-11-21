import { Repo } from "../../core/infra/Repo";
import { Classroom } from "../../domain/classroom/classroom";
import { ClassroomId } from "../../domain/classroom/classroomID";

export default interface IClassroomRepo extends Repo<Classroom> {
    save(classroom: Classroom): Promise<Classroom>;
    findByDomainId (classroomId: ClassroomId | string): Promise<Classroom>;
    getAllClassrooms(): Promise<Classroom[]>;
}