import { Inject, Service } from "typedi";
import IClassroomService from "../IServices/IClassroomService";
import IClassroomRepo from "../IRepos/IClassroomRepo";
import { Result } from "../../core/logic/Result";
import IClassroomDTO from "../../dto/IClassroomDTO";
import { Classroom } from "../../domain/classroom/classroom";
import { ClassroomMap } from "../../mappers/ClassroomMap";
import config from "../../../config";
import { ClassroomName } from "../../domain/classroom/classroomName";
import { ClassroomDescription } from "../../domain/classroom/classroomDescription";
import { ClassroomCategory } from "../../domain/classroom/classroomCategory";

@Service()
export default class ClassroomService implements IClassroomService {
    constructor(@Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo) {}

    public async createClassroom(classroomDTO: IClassroomDTO): Promise<Result<IClassroomDTO>> {
        try {
            const classroomOrError = await Classroom.create(classroomDTO);
    
            if (classroomOrError.isFailure) {
                const errorMessage = classroomOrError.errorValue();
                return Result.fail<IClassroomDTO>(errorMessage);
            }
    
            const classroomResult = classroomOrError.getValue();
            
            await this.classroomRepo.save(classroomResult);
    
            const classroomDTOResult = ClassroomMap.toDTO(classroomResult) as IClassroomDTO;
            return Result.ok<IClassroomDTO>(classroomDTOResult);
        } catch (error) {
            throw new Error(`Error creating classroom: ${error.message}`);
        }
    }

    public async updateClassroom(classroomDTO: IClassroomDTO): Promise<Result<IClassroomDTO>> {
        try {
            const classroom = await this.classroomRepo.findByDomainId(classroomDTO.id);
    
            if (classroom === null) {
                return Result.fail<IClassroomDTO>('Classroom not found');
            } else {
                // Update classroom properties as before
                classroom.name = ClassroomName.create(classroomDTO.name).getValue().name;
                classroom.description = ClassroomDescription.create(classroomDTO.description).getValue().description;
                classroom.category = ClassroomCategory.create(classroomDTO.category).getValue().category;
                classroom.length = classroomDTO.length;
                classroom.width = classroomDTO.width;
                
                // Save the classroom
                await this.classroomRepo.save(classroom);
    
                const classroomDTOResult = ClassroomMap.toDTO(classroom) as IClassroomDTO;
                return Result.ok<IClassroomDTO>(classroomDTOResult);
            }
        } catch (error) {
            throw new Error(`Error updating classroom: ${error.message}`);
        }
    }
}