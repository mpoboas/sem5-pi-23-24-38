import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from '../../core/logic/Result';
import { Dimension } from "../dimension";
import { FloorDescription } from "./floorDescription";
import IFloorDTO from "../../dto/IFloorDTO";
import { Guard } from "../../core/logic/Guard";

interface FloorProps {
    floorNumber: string;
    description?: string;
    length: number;
    width: number;
    classrooms: string[];
}

export class Floor extends AggregateRoot<FloorProps> {
    get id(): UniqueEntityID{
        return this._id;
    }


    get floorNumber(): string{
        return this.props.floorNumber;
    }

    set floorNumber(value: string){
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

    get classrooms(): string[] {
        return this.props.classrooms;
      }
    
    set classrooms(value: string[]) {
        this.props.classrooms = value;
    }

    private constructor(props: FloorProps, id?: UniqueEntityID){
        super(props, id);
    }

    /*public static create(floorDTO: IFloorDTO, id?: UniqueEntityID): Result<Floor>{
        const fNumber = floorDTO.floorNumber;
        const fDescription = FloorDescription.create(floorDTO.description);
        const fLength = floorDTO.length;
        const fWidth = floorDTO.width;
        const fBuildingId = floorDTO.buildingId;
  
        const guardedProps =[
            {argument: fNumber, argumentName: 'floorNumber'},
            {argument: fDescription, argumentName: 'description'},
            {argument: fLength, argumentName: 'length'},
            {argument: fWidth, argumentName: 'width'},
            {argument: fBuildingId, argumentName: 'buildingId'},
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        if(!guardResult.succeeded){
            return Result.fail<Floor>(guardResult.message);
        } else {
            const floor = new Floor({floorNumber: fNumber, description: fDescription.getValue().description, length: fLength, width: fWidth, buildingId: fBuildingId}, id);
            return Result.ok<Floor>(floor);
        }*/

        public static create (props: FloorProps, id?: UniqueEntityID): Result<Floor> {

            const guardedProps = [
              { argument: props.floorNumber, argumentName: 'floorNumber' },
              { argument: props.description, argumentName: 'description' },
              { argument: props.length, argumentName: 'length' },
              { argument: props.width, argumentName: 'width'}
            ];
        
            const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        
            if(props.length < 0 || props.width < 0){
            return Result.fail<Floor>('Invalid arguments: floorNumber, description, length, width');
            }

            if (!guardResult.succeeded) {
              return Result.fail<Floor>(guardResult.message)
            } else {
              const floor = new Floor({
                ...props
              }, id);
        
              return Result.ok<Floor>(floor);
            }
          }
      
}