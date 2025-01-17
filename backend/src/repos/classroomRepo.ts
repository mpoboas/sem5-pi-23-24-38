import { Inject, Service } from 'typedi';
import IClassroomRepo from '../services/IRepos/IClassroomRepo';
import { IClassroomPersistence } from '../dataschema/IClassroomPersistence';
import { Document, FilterQuery, Model } from 'mongoose';
import { Classroom } from '../domain/classroom/classroom';
import { ClassroomId } from '../domain/classroom/classroomID';
import { ClassroomMap } from '../mappers/ClassroomMap';

@Service()
export default class ClassroomRepo implements IClassroomRepo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const classroomDocument = await this.classroomSchema.findOne(
      query as FilterQuery<IClassroomPersistence & Document>,
    );

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
        classroomDocument.cordx = classroom.cordx;
        classroomDocument.cordy = classroom.cordy;
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

  public async getAllClassrooms(): Promise<Classroom[]> {
    try {
      const classroomDocuments = await this.classroomSchema.find().exec();

      if (!classroomDocuments) {
        return [];
      }

      const classrooms = classroomDocuments.map(classroomDocument => ClassroomMap.toDomain(classroomDocument));

      return classrooms;
    } catch (error) {
      throw new Error(`Error fetching classrooms: ${error.message}`);
    }
  }

  public async findClassroomsByFloorId(floorId: string): Promise<Classroom[]> {
    try {
      const query = { floorId: floorId };
      const classroomRecord = await this.classroomSchema.find(query as FilterQuery<IClassroomPersistence & Document>);

      if (!classroomRecord) {
        return [];
      }

      const classroomPromises = classroomRecord.map(classroomRecord => ClassroomMap.toDomain(classroomRecord));
      const classrooms = await Promise.all(classroomPromises);

      return classrooms;
    } catch (error) {
      throw new Error(`Error fetching classrooms: ${error.message}`);
    }
  }
}
