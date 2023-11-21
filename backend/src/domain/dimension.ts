import { ValueObject } from "../core/domain/ValueObject";
import { Result } from '../core/logic/Result';
import IBuildingDTO from "../dto/IBuildingDTO";


interface dimensionProps{
    length: number;
    width: number;
}

export class Dimension extends ValueObject<dimensionProps>{
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

    private constructor(props: dimensionProps){
        super(props);
    }

    public static create(length: number, width: number): Result<Dimension>{

        if(length === null || length === undefined || length <= 0){
            return Result.fail<Dimension>("length is required");
        } if(width === null || width === undefined || width <= 0){
            return Result.fail<Dimension>("width is required");
        } else {
            return Result.ok<Dimension>(new Dimension({length: length, width: width}));
        }
    }
}