import { Request, Response, NextFunction } from 'express';

export default interface IBuildingController  {
  createBuilding(req: Request, res: Response, next: NextFunction);
  updateBuilding(req: Request, res: Response, next: NextFunction);
  patchBuilding(req: Request, res: Response, next: NextFunction);
  //loadFloors(req: Request, res: Response, next: NextFunction);
  listAllBuildings(req: Request, res: Response, next: NextFunction);
  findBuildingByDomainId(req: Request, res: Response, next: NextFunction);
  findBuildingByCode(req: Request, res: Response, next: NextFunction);
  findBuildingByMinMaxFloors(req: Request, res: Response, next: NextFunction);
  findBuildingCode(req: Request, res: Response, next: NextFunction);
  //listAllFloors(req: Request, res: Response, next: NextFunction);
}