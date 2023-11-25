export default interface IFloorDTO {
  id: string;
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
  map: string;
  json: string;
}
