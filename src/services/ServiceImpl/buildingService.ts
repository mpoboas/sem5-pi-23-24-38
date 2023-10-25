import { Service, Inject } from 'typedi';
import config from '../../../config';
import IBuildingDTO from '../../dto/IBuildingDTO';
import { Building } from '../../domain/building/building';
import IBuildingRepo from '../IRepos/IBuildingRepo';
import IBuildingService from '../IServices/IBuildingService';
import { Result } from '../../core/logic/Result';
import { BuildingMap } from '../../mappers/BuildingMap';
import { BuildingLetter } from '../../domain/building/buildingLetter';
import { BuildingDescription } from '../../domain/building/buildingDescription';
import { BuildingCode } from '../../domain/building/buildingCode';

@Service()
export default class BuildingService implements IBuildingService {
    constructor(@Inject(config.repos.building.name) private buildingRepo: IBuildingRepo) {}

    public async getBuilding(buildingId: string): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingId);

            if (building === null) {
                return Result.fail<IBuildingDTO>('Building not found');
            } else {
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return Result.ok<IBuildingDTO>(buildingDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const buildingOrError = await Building.create(buildingDTO);

            if (buildingOrError.isFailure) {
                const errorMessage = buildingOrError.errorValue();
                return Result.fail<IBuildingDTO>(errorMessage);
            }

            const buildingResult = buildingOrError.getValue();

            await this.buildingRepo.save(buildingResult);

            const buildingDTOResult = BuildingMap.toDTO(buildingResult) as IBuildingDTO;
            return Result.ok<IBuildingDTO>(buildingDTOResult);
        } catch (error) {
            throw new Error(`Error creating building: ${error.message}`);
        }
    }

    public async updateBuilding(buildingDTO: IBuildingDTO): Promise<Result<IBuildingDTO>> {
        try {
            const building = await this.buildingRepo.findByDomainId(buildingDTO.id);

            if (building === null) {
                return Result.fail<IBuildingDTO>('Building not found');
            } else {
                building.letter = BuildingLetter.create(buildingDTO.letter).getValue().letter;
                building.length = buildingDTO.length;
                building.width = buildingDTO.width;
                building.description = BuildingDescription.create(buildingDTO.description).getValue().description;
                building.code = BuildingCode.create(buildingDTO.code).getValue().code;
                await this.buildingRepo.save(building);

                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return Result.ok<IBuildingDTO>(buildingDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllBuildings(): Promise<IBuildingDTO[]> {
        try {
            const buildings = await this.buildingRepo.getAllBuildings();

            return buildings.map((building) => {
                const buildingDTOResult = BuildingMap.toDTO(building) as IBuildingDTO;
                return buildingDTOResult;
            });
        } catch (error) {
            throw new Error(`Error fetching buildings: ${error.message}`);
        }
    }
}
