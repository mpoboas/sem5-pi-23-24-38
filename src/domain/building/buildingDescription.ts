import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from '../../core/logic/Result';


interface BuildingDescriptionProps{
    description: string;
}

export class BuildingDescription extends ValueObject<BuildingDescriptionProps>{
    get description (): string {  
        return this.props.description;
    }

    set x (value: string) {
        this.props.description = value;
    }

    private constructor (props: BuildingDescriptionProps) {
        super(props);
    }

    public static create (description: string ): Result<BuildingDescription> {
        
        if(description === null || description === undefined){
            return Result.fail<BuildingDescription>("Description is required");
        } else {
            return Result.ok<BuildingDescription>(new BuildingDescription({description: description}));
        }

    }

}