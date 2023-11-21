import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from '../../core/logic/Result';


interface ClassroomCategoryProps{
    category: string;
}

export class ClassroomCategory extends ValueObject<ClassroomCategoryProps>{
    get category (): string {  
        return this.props.category;
    }

    set category (value: string) {
        this.props.category = value;
    }

    private constructor (props: ClassroomCategoryProps) {
        super(props);
    }

    public static create (category: string ): Result<ClassroomCategory> {
        
        if(category === null || category === undefined){
            return Result.fail<ClassroomCategory>("Category is required");
        } else {
            return Result.ok<ClassroomCategory>(new ClassroomCategory({category: category}));
        }

    }

}