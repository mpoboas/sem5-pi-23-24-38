import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { DeliveryDescription } from './deliveryDescription';
import IPickupDeliveryTaskDTO from '../../dto/IPickupDeliveryTaskDTO';

interface PickupDeliveyTaskProps {
    pickupClassroom: string;
    deliveryClassroom: string;
    pickupContact: string;
    deliveryContact: string;
    confirmationCode: number;
    deliveryDescription: string;
    isPending: boolean;
    isApproved: boolean;
    active: boolean;
}

export class PickupDeliveryTask extends AggregateRoot<PickupDeliveyTaskProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get pickupClassroom(): string {
        return this.props.pickupClassroom;
    }

    set pickupClassroom(value: string) {
        this.props.pickupClassroom = value;
    }

    get deliveryClassroom(): string {
        return this.props.deliveryClassroom;
    }

    set deliveryClassroom(value: string) {
        this.props.deliveryClassroom = value;
    }

    get pickupContact(): string {
        return this.props.pickupContact;
    }

    set pickupContact(value: string) {
        this.props.pickupContact = value;
    }

    get deliveryContact(): string {
        return this.props.deliveryContact;
    }

    set deliveryContact(value: string) {
        this.props.deliveryContact = value;
    }

    get confirmationCode(): number {
        return this.props.confirmationCode;
    }

    set confirmationCode(value: number) {
        this.props.confirmationCode = value;
    }   

    get deliveryDescription(): string {
        return this.props.deliveryDescription;
    }

    set deliveryDescription(value: string) {
        this.props.deliveryDescription = value;
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

    private constructor(props: PickupDeliveyTaskProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(pickupDeliveryTaskDTO: IPickupDeliveryTaskDTO, id?: UniqueEntityID): Result<PickupDeliveryTask> {
        const tPickupClassroom = pickupDeliveryTaskDTO.pickupClassroom;
        const tDeliveryClassroom = pickupDeliveryTaskDTO.deliveryClassroom;
        const tPickupContact = pickupDeliveryTaskDTO.pickupContact;
        const tDeliveryContact = pickupDeliveryTaskDTO.deliveryContact;
        const tConfirmationCode = pickupDeliveryTaskDTO.confirmationCode;
        const tDeliveryDescription = DeliveryDescription.create(pickupDeliveryTaskDTO.deliveryDescription);
        const tIsPending = pickupDeliveryTaskDTO.isPending;
        const tIsApproved = pickupDeliveryTaskDTO.isApproved;

        const guardedProps = [
            { argument: tPickupClassroom, argumentName: 'pickupClassroom' },
            { argument: tDeliveryClassroom, argumentName: 'deliveryClassroom' },
            { argument: tPickupContact, argumentName: 'pickupContact' },
            { argument: tDeliveryContact, argumentName: 'deliveryContact' },
            { argument: tConfirmationCode, argumentName: 'confirmationCode' },
            { argument: tDeliveryDescription, argumentName: 'deliveryDescription'},
            { argument: tIsPending, argumentName: 'isPending' },
            { argument: tIsApproved, argumentName: 'isApproved' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<PickupDeliveryTask>(guardResult.message);
        } else {
            const pickupDeliveryTask = new PickupDeliveryTask({
                pickupClassroom: tPickupClassroom,
                deliveryClassroom: tDeliveryClassroom,
                pickupContact: tPickupContact,
                deliveryContact: tDeliveryContact,
                confirmationCode: tConfirmationCode,
                deliveryDescription: tDeliveryDescription.getValue().description,
                isPending: tIsPending,
                isApproved: tIsApproved,
                active: true
            }, id);

            return Result.ok<PickupDeliveryTask>(pickupDeliveryTask);
        }
    }
}