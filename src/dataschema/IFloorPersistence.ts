import { Building } from "../domain/building/building";

export interface IFloorPersistence{
    domainId: string;
    floorNumber: number;
    description?: string;
    length: number;
    width: number;
}