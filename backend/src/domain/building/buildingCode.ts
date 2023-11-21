import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
interface BuildingCodeProps{
    code: string;
}

export class BuildingCode extends ValueObject<BuildingCodeProps> {
     
    get code (): string {  
        return this.props.code;
    }
    
    set code (value: string) {
        this.props.code = value;
    }

    private constructor(props:BuildingCodeProps) {
        super(props);
    }
 

    private static validateCode(code: string): Result<string> {
        const regex: RegExp = /^[A-Za-z0-9]\d{4}$/;
        if (code == null) {
            return Result.fail<string>("Code can't be empty");
        }
        if (!regex.test(code)) {
            return Result.fail<string>("Invalid Code");
        }
        return Result.ok<string>(code);
    }
    

    public static create(code:string):Result<BuildingCode> {
        const validate = this.validateCode(code);
        if(!validate.isSuccess) {
            return Result.fail<BuildingCode>(validate);
        } else {
            return Result.ok<BuildingCode>(new BuildingCode({code: code}));
        }
    }

}