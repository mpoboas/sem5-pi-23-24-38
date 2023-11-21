import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Dimension } from "../dimension";
import { ClassroomDescription } from "./classroomDescription";
import {ClassroomCategory} from "./classroomCategory";
import { ClassroomName } from "./classroomName";
import e from "express";
import IClassroomDTO from "../../dto/IClassroomDTO";
import { floor } from "lodash";

interface ClassroomProps{
    name: string;
    description: string;
    category: string;
    length: number;
    width: number;
    floorId: string;
}

export class Classroom extends AggregateRoot<ClassroomProps>{
    get id(): UniqueEntityID {
        return this._id;
    }
    
    get name(): string {
        return this.props.name;
    }

    set name(value: string) {
        this.props.name = value;
    }  

    get description(): string {
        return this.props.description;
    }

    set description(value: string) {   
        this.props.description = value;
    }

    get category(): string {
        return this.props.category;
    }

    set category(value: string) {
        this.props.category = value;
    }

    get length(): number {   
        return this.props.length;
    }

    set length(value: number){
        this.props.length = value;
    }

    get width(): number {   
        return this.props.width;
    }

    set width(value: number){
        this.props.width = value;
    }

    get floorId(): string {
        return this.props.floorId;
    }

    set floorId(value: string) {
        this.props.floorId = value;
    }

    private constructor (props: ClassroomProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (classroomDTO: IClassroomDTO, id?: UniqueEntityID): Result<Classroom> {
        const cName = ClassroomName.create(classroomDTO.name);
        const cDescription = ClassroomDescription.create(classroomDTO.description);
        const cCategory = ClassroomCategory.create(classroomDTO.category);
        const cDimension = Dimension.create(classroomDTO.length, classroomDTO.width);
        const cFloorId = classroomDTO.floorId;

        if(cName.isFailure){
            return Result.fail<Classroom>(cName.error.toString());
        } else if (cDescription.isFailure){
            return Result.fail<Classroom>(cDescription.error.toString());
        } else if (cCategory.isFailure){
            return Result.fail<Classroom>(cCategory.error.toString());
        } else if (cDimension.isFailure){
            return Result.fail<Classroom>(cDimension.error.toString());
        } else {
            const classroom = new Classroom({
                name: cName.getValue().name,
                description: cDescription.getValue().description,
                category: cCategory.getValue().category,
                length: cDimension.getValue().length,
                width: cDimension.getValue().width,
                floorId: cFloorId,
            }, id);

            return Result.ok<Classroom>(classroom);
        }

    }
}