import { ValueObject } from "../core/domain/ValueObject";
import { Result } from '../core/logic/Result';


interface coordinatesProps{
    x: number;
    y: number;
}

export class Coordinates extends ValueObject<coordinatesProps>{
    get x (): number {  
        return this.props.x;
    }

    set x (value: number) {
        this.props.x = value;
    }

    get y (): number {
        return this.props.y;
    }

    set y (value: number) {
        this.props.y = value;
    }

    private constructor (props: coordinatesProps) {
        super(props);
    }

    public static create (x: number, y: number): Result<Coordinates> {
        
        if(x === null || x === undefined || y === null || y === undefined){
            return Result.fail<Coordinates>("x/y is required");
        } else {
            return Result.ok<Coordinates>(new Coordinates({x: x, y: y}));
        }

    }

}
