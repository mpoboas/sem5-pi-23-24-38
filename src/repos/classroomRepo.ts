import { Inject, Service } from "typedi";
import IClassroomRepo from "../services/IRepos/IClassroomRepo";
import { IClassroomPersistence } from "../dataschema/IClassroomPersistence";
import { Document, FilterQuery, Model } from "mongoose";
import { Classroom } from "../domain/classroom/classroom";
import { ClassroomId } from "../domain/classroom/classroomID";
import { ClassroomMap } from "../mappers/ClassroomMap";

@Service()
export default class ClassroomRepo implements IClassroomRepo {
    private models: any;

    constructor(@Inject('classroomSchema') private classroomSchema: Model<IClassroomPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(classroom: Classroom): Promise<boolean> {
        const idX = classroom.id instanceof ClassroomId ? (<ClassroomId>classroom.id).toValue() : classroom.id;

        const query = { domainId: idX };
        const classroomDocument = await this.classroomSchema.findOne(query as FilterQuery<IClassroomPersistence & Document>);

        return !!classroomDocument === true;
    }

    public async save(classroom: Classroom): Promise<Classroom> {
        const query = { domainId: classroom.id.toString() };

        const classroomDocument = await this.classroomSchema.findOne(query);

        try {
            if (classroomDocument === null) {
                const rawClassroom: any = ClassroomMap.toPersistence(classroom);

                const classroomCreated = await this.classroomSchema.create(rawClassroom);

                return ClassroomMap.toDomain(classroomCreated);
            } else {
                classroomDocument.name = classroom.name;
                classroomDocument.description = classroom.description;
                classroomDocument.category = classroom.category;
                classroomDocument.length = classroom.length;
                classroomDocument.width = classroom.width;
                classroomDocument.floorId = classroom.floorId;
                await classroomDocument.save();

                return classroom;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(classroomId: ClassroomId | string): Promise<Classroom> {
        const query = { domainId: classroomId };
        const classroomRecord = await this.classroomSchema.findOne(query as FilterQuery<IClassroomPersistence & Document>);

        if (classroomRecord != null) {
            return ClassroomMap.toDomain(classroomRecord);
        } else return null;
    }
}