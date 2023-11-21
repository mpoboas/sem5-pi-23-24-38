export interface IFloorPersistence {
  domainId: string;
  floorNumber: string;
  description?: string;
  length: number;
  width: number;
  buildingId: string;
  map: string;
}
