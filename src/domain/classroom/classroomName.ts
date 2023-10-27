import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from '../../core/logic/Result';


interface ClassroomNameProps{
    name: string;
}

export class ClassroomName extends ValueObject<ClassroomNameProps>{
    get name (): string {  
        return this.props.name;
    }

    set name (value: string) {
        this.props.name = value;
    }

    private constructor (props: ClassroomNameProps) {
        super(props);
    }

    public static create (name: string ): Result<ClassroomName> {
        
        if(name === null || name === undefined){
            return Result.fail<ClassroomName>("Name is required");
        } else {
            return Result.ok<ClassroomName>(new ClassroomName({name: name}));
        }

    }

}