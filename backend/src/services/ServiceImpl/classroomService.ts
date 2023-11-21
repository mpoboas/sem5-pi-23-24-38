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
import IFloorRepo from "../IRepos/IFloorRepo";

@Service()
export default class ClassroomService implements IClassroomService {
    constructor(@Inject(config.repos.classroom.name) private classroomRepo: IClassroomRepo,
                @Inject(config.repos.floor.name) private floorRepo: IFloorRepo) {}

    public async createClassroom(classroomDTO: IClassroomDTO): Promise<Result<IClassroomDTO>> {
        try {
            const floorId = classroomDTO.floorId;
            if (floorId == null) {
                throw new Error('Floor ID is required');
            }
            const floor = await this.floorRepo.findByDomainId(classroomDTO.floorId);
            if (floor == null) {
                throw new Error('Floor not found');
            }

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
                const floorId = classroomDTO.floorId;
                if (floorId == null) {
                    throw new Error('Floor ID is required');
                }
                const floor = await this.floorRepo.findByDomainId(classroomDTO.floorId);
                if (floor == null) {
                    throw new Error('Floor not found');
                }
                // Update classroom properties as before
                classroom.name = ClassroomName.create(classroomDTO.name).getValue().name;
                classroom.description = ClassroomDescription.create(classroomDTO.description).getValue().description;
                classroom.category = ClassroomCategory.create(classroomDTO.category).getValue().category;
                classroom.length = classroomDTO.length;
                classroom.width = classroomDTO.width;
                classroom.floorId = classroomDTO.floorId;
                
                // Save the classroom
                await this.classroomRepo.save(classroom);
    
                const classroomDTOResult = ClassroomMap.toDTO(classroom) as IClassroomDTO;
                return Result.ok<IClassroomDTO>(classroomDTOResult);
            }
        } catch (error) {
            throw new Error(`Error updating classroom: ${error.message}`);
        }
    }

    public async getAllClassrooms(): Promise<IClassroomDTO[]> {
        try {
            const classrooms = await this.classroomRepo.getAllClassrooms();
            
            return classrooms.map((floor) => {
                const classroomDTOResult = ClassroomMap.toDTO(floor) as IClassroomDTO;
                return classroomDTOResult;
            });
        } catch (error) {
            throw new Error(`Error listing classrooms: ${error.message}`);
        }
    }
}