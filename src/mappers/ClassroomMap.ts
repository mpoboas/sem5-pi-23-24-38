import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Classroom } from "../domain/classroom/classroom";
import IClassroomDTO from "../dto/IClassroomDTO";
import { IClassroomPersistence } from "../dataschema/IClassroomPersistence";

export class ClassroomMap extends Mapper<Classroom>{

    public static toDTO (classroom: Classroom): IClassroomDTO {
        return {
            id: classroom.id.toString(),
            name: classroom.name,
            description: classroom.description,
            category: classroom.category,
            length: classroom.length,
            width: classroom.width,
            floorId: classroom.floorId.toString()
        } as IClassroomDTO;
    }

    public static toDomain (classroom: any | Model<IClassroomPersistence & Document>): Classroom {
        const classroomOrError = Classroom.create(classroom, new UniqueEntityID(classroom.domainId));

        classroomOrError.isFailure ? console.log(classroomOrError.error) : '';

        return classroomOrError.isSuccess ? classroomOrError.getValue() : null;
    }

    public static toPersistence (classroom: Classroom): any {
        return {
            domainId: classroom.id.toString(),
            name: classroom.name,
            description: classroom.description,
            category: classroom.category,
            length: classroom.length,
            width: classroom.width,
            floorId: classroom.floorId.toString()
        };
    }
}