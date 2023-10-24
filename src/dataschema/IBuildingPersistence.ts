import { BuildingCode } from "../domain/building/buildingCode";
import { BuildingDescription } from "../domain/building/buildingDescription";
import { BuildingLetter } from "../domain/building/buildingLetter";
import { Coordinates } from "../domain/coordinates";
import { Dimension } from "../domain/dimension";

export interface IBuildingPersistence{
    domainId: string;
    letter: string;
    length: number;
    width: number;
    description: string;
    code: string;
}