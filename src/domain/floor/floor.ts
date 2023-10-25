import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from '../../core/logic/Result';
import { Dimension } from "../dimension";
import { FloorDescription } from "./floorDescription";
import IFloorDTO from "../../dto/IFloorDTO";
import { Guard } from "../../core/logic/Guard";

interface FloorProps {
    floorNumber: number;
    description?: string;
    length: number;
    width: number;
}

export class Floor extends AggregateRoot<FloorProps> {
    get id(): UniqueEntityID{
        return this._id;
    }


    get floorNumber(): number{
        return this.props.floorNumber;
    }

    set floorNumber(value: number){
        this.props.floorNumber = value;
    }

    get description(): string{
        return this.props.description;
    }

    set description(value: string){
        this.props.description = value;
    }

    get length(): number{
        return this.props.length;
    }

    set length(value: number){
        this.props.length = value;
    }

    get width(): number{
        return this.props.width;
    }

    set width(value: number){
        this.props.width = value;
    }   

    private constructor(props: FloorProps, id?: UniqueEntityID){
        super(props, id);
    }

    public static create(floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor>{
        const fNumber = floorDTO.floorNumber;
        const fDescription = FloorDescription.create(floorDTO.description);
        const fLength = floorDTO.length;
        const fWidth = floorDTO.width;
  
        const guardedProps =[
            {argument: fNumber, argumentName: 'floorNumber'},
            {argument: fDescription, argumentName: 'description'},
            {argument: fLength, argumentName: 'length'},
            {argument: fWidth, argumentName: 'width'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if(!guardResult.succeeded){
            return Result.fail<Floor>(guardResult.message);
        } else {
            const floor = new Floor({floorNumber: fNumber, description: fDescription.getValue().description, length: fLength, width: fWidth}, id);
            return Result.ok<Floor>(floor);
        }
    }  
}