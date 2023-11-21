import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface BuildingLetterProps {
  letter: string;
}

export class BuildingLetter extends ValueObject<BuildingLetterProps> {
  get letter(): string {
    return this.props.letter;
  }

  set x(value: string) {
    this.props.letter = value;
  }

  private constructor(props: BuildingLetterProps) {
    super(props);
  }

  public static create(letter: string): Result<BuildingLetter> {
    if (letter === null || letter === undefined) {
      return Result.fail<BuildingLetter>('Letter is required');
    } else {
      return Result.ok<BuildingLetter>(new BuildingLetter({ letter: letter }));
    }
  }
}
