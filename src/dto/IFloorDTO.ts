import { Building } from "../domain/building/building";

export default interface IFloorDTO {
    id: string;
    floorNumber: string;
    description?: string;
    length: number;
    width: number;
    classrooms: string[];
}