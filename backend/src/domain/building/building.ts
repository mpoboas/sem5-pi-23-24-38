import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Dimension } from '../dimension';
import { Result } from '../../core/logic/Result';
import IBuildingDTO from '../../dto/IBuildingDTO';
import { BuildingLetter } from './buildingLetter';
import { BuildingDescription } from './buildingDescription';
import { BuildingCode } from './buildingCode';

interface BuildingProps {
  letter: string;
  length: number;
  width: number;
  description?: string;
  code: string;
}

export class Building extends AggregateRoot<BuildingProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get letter(): string {
    return this.props.letter;
  }

  set letter(value: string) {
    this.props.letter = value;
  }

  get length(): number {
    return this.props.length;
  }

  set length(value: number) {
    this.props.length = value;
  }

  get width(): number {
    return this.props.width;
  }

  set width(value: number) {
    this.props.width = value;
  }

  get description(): string {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get code(): string {
    return this.props.code;
  }

  set code(value: string) {
    this.props.code = value;
  }

  private constructor(props: BuildingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(buildingDTO: IBuildingDTO, id?: UniqueEntityID): Result<Building> {
    const bLetter = BuildingLetter.create(buildingDTO.letter);
    const bDimension = Dimension.create(buildingDTO.length, buildingDTO.width);
    const bDescription = BuildingDescription.create(buildingDTO.description);
    const bCode = BuildingCode.create(buildingDTO.code);

    if (bLetter.isFailure) {
      return Result.fail<Building>(bLetter.error.toString());
    } else if (bDescription.isFailure) {
      return Result.fail<Building>(bDescription.error.toString());
    } else if (bCode.isFailure) {
      return Result.fail<Building>(bCode.error.toString());
    } else if (bDimension.isFailure) {
      return Result.fail<Building>(bDimension.error.toString());
    } else {
      const building = new Building(
        {
          code: bCode.getValue().code,
          letter: bLetter.getValue().letter,
          description: bDescription.getValue().description,
          length: buildingDTO.length,
          width: buildingDTO.width,
        },
        id,
      );
      return Result.ok<Building>(building);
    }
  }
}
