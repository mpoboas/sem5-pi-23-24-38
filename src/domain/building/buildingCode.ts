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
 

    private static validateCode(code:string) {
        var regex:RegExp = new RegExp("^(?!.*  )[a-zA-Z0-9 ]{1,5}$");
        if(code == null){
            return Result.fail<BuildingCode>("Code can't be empty");
        } 
        if(!regex.test(code)){
            return Result.fail<BuildingCode>("Invalid Code");
        };
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