import { Building } from "../domain/building/building";

export interface IFloorPersistence{
    domainId: string;
    floorNumber: string;
    description?: string;
    length: number;
    width: number;
    classrooms: string[];
}