import { Building } from "../domain/building/building";

export default interface IFloorDTO {
    id: string;
    floorNumber: number;
    description?: string;
    length: number;
    width: number;
  }