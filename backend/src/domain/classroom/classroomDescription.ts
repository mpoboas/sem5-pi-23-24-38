import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface ClassroomDescriptionProps {
  description: string;
}

export class ClassroomDescription extends ValueObject<ClassroomDescriptionProps> {
  get description(): string {
    return this.props.description;
  }

  set x(value: string) {
    this.props.description = value;
  }

  private constructor(props: ClassroomDescriptionProps) {
    super(props);
  }

  public static create(description: string): Result<ClassroomDescription> {
    if (description === null || description === undefined) {
      return Result.fail<ClassroomDescription>('Description is required');
    } else {
      return Result.ok<ClassroomDescription>(new ClassroomDescription({ description: description }));
    }
  }
}
