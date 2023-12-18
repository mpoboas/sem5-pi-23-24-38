import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from '../../core/logic/Result';

interface UserPhoneNumberProps {
    phoneNumber: string;
}

export class UserPhoneNumber extends ValueObject<UserPhoneNumberProps> {
    get phoneNumber(): string {
        return this.props.phoneNumber;
    }

    set phoneNumber(value: string) {
        this.props.phoneNumber = value;
    }

    private constructor(props: UserPhoneNumberProps) {
        super(props);
    }

    private static validatePhoneNumber(phoneNumber: string): Result<string> {
        const regex: RegExp = /^[9]\d{8}$/;
        if (phoneNumber == null) {
            return Result.fail<string>("Phone number can't be empty");
        }
        if (!regex.test(phoneNumber)) {
            return Result.fail<string>('Invalid Phone Number');
        }
        return Result.ok<string>(phoneNumber);
    }

    public static create(phoneNumber: string): Result<UserPhoneNumber> {
        const validate = this.validatePhoneNumber(phoneNumber);
        if (!validate.isSuccess) {
            return Result.fail<UserPhoneNumber>(validate);
        } else {
            return Result.ok<UserPhoneNumber>(new UserPhoneNumber({ phoneNumber: phoneNumber }));
        }
    }
}