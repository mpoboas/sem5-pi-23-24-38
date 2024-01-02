import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import ISurveillanceTaskDTO from "../../dto/ISurveillanceTaskDTO";

interface SurveillanceTaskProps {
    building: string;
    floors: string[];
    emergencyContact: string;
    isPending: boolean;
    isApproved: boolean;
    active: boolean;
}

export class SurveillanceTask extends AggregateRoot<SurveillanceTaskProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get building(): string {
        return this.props.building;
    }

    set building(value: string) {
        this.props.building = value;
    }

    get floors(): string[] {
        return this.props.floors;
    }

    set floors(value: string[]) {
        this.props.floors = value;
    }

    get emergencyContact(): string {
        return this.props.emergencyContact;
    }

    set emergencyContact(value: string) {
        this.props.emergencyContact = value;
    }

    get isPending(): boolean {
        return this.props.isPending;
    }

    set isPending(value: boolean) {
        this.props.isPending = value;
    }

    get isApproved(): boolean {
        return this.props.isApproved;
    }

    set isApproved(value: boolean) {
        this.props.isApproved = value;
    }

    get active(): boolean {
        return this.props.active;
    }

    set active(value: boolean) {
        this.props.active = value;
    }

    private constructor(props: SurveillanceTaskProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(surveillanceTaskDTO: ISurveillanceTaskDTO, id?: UniqueEntityID): Result<SurveillanceTask> {
        const tBuilding = surveillanceTaskDTO.building;
        const tFloors = surveillanceTaskDTO.floors;
        const tEmergencyContact = surveillanceTaskDTO.emergencyContact;
        const tIsPending = surveillanceTaskDTO.isPending;
        const tIsApproved = surveillanceTaskDTO.isApproved;

        const guardedProps = [
            { argument: tBuilding, argumentName: 'building' },
            { argument: tFloors, argumentName: 'floors' },
            { argument: tEmergencyContact, argumentName: 'emergencyContact' },
            { argument: tIsPending, argumentName: 'isPending' },
            { argument: tIsApproved, argumentName: 'isApproved' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<SurveillanceTask>(guardResult.message);
        } else {
            const surveillanceTask = new SurveillanceTask({
                building: tBuilding,
                floors: tFloors,
                emergencyContact: tEmergencyContact,
                isPending: tIsPending,
                isApproved: tIsApproved,
                active: true
            }, id);

            return Result.ok<SurveillanceTask>(surveillanceTask);
        }
    }

}