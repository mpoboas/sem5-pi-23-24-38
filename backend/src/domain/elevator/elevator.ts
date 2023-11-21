import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Coordinates } from "../coordinates";
import { Result } from '../../core/logic/Result';
import IElevatorDTO from "../../dto/IElevatorDTO";


interface ElevatorProps{
    x: number,
    y: number,
    buildingId: string
}

export class Elevator extends AggregateRoot<ElevatorProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get x(): number {
        return this.props.x;
    }
    
    set x(value: number) {
        this.props.x = value;
    }

    get y(): number {
        return this.props.y;
    }
    
    set y(value: number) {
        this.props.y = value;
    }

    get buildingId(): string {
        return this.props.buildingId;
    }

    set buildingId(value: string) {
        this.props.buildingId = value;
    }

    private constructor(props: ElevatorProps, id?: UniqueEntityID){
        super(props, id);
    }

    public static create(elevatorDTO: IElevatorDTO, id?: UniqueEntityID): Result<Elevator>{
        const eleCoordinates = Coordinates.create(elevatorDTO.x, elevatorDTO.y);

        if (eleCoordinates.isFailure) {
            return Result.fail<Elevator>(eleCoordinates.error.toString())
          
        } else {
            const elevator = new Elevator({ 
                x: eleCoordinates.getValue().x,
                y: eleCoordinates.getValue().y,
                buildingId : elevatorDTO.buildingId
            }, id);
            return Result.ok<Elevator>(elevator);   
        }
    }
}