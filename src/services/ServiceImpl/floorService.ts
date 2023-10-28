import { Service, Inject } from 'typedi';
import config from '../../../config';
import IFloorDTO from '../../dto/IFloorDTO';
import { Floor} from '../../domain/floor/floor';
import IFloorRepo from '../IRepos/IFloorRepo';
import IFloorService from '../IServices/IFloorService';
import { Result } from '../../core/logic/Result';
import { FloorMap } from '../../mappers/FloorMap';
import { FloorDescription } from '../../domain/floor/floorDescription';



@Service()
export default class FloorService implements IFloorService {
    constructor(@Inject(config.repos.floor.name) private floorRepo: IFloorRepo) {}
   
    public async getFloor(floorId: string): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found');
            } else {
                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult);
            }
        } catch (e) {
            throw e;
        } 
    }

    public async createFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {

            
            const floorOrError = await Floor.create(floorDTO);

            if (floorOrError.isFailure) {
                const errorMessage = floorOrError.errorValue();
                return Result.fail<IFloorDTO>(errorMessage);
            }

            const floorResult = floorOrError.getValue();

            await this.floorRepo.save(floorResult);

            const floorDTOResult = FloorMap.toDTO(floorResult) as IFloorDTO;
            return Result.ok<IFloorDTO>(floorDTOResult);
        } catch (error) {
            throw new Error(`Error creating floor: ${error.message}`);
        }
    }

    public async updateFloor(floorDTO: IFloorDTO): Promise<Result<IFloorDTO>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorDTO.id);

            if (floor === null) {
                return Result.fail<IFloorDTO>('Floor not found');
            } else {
                floor.floorNumber = floorDTO.floorNumber;
                floor.description = FloorDescription.create(floorDTO.description).getValue().description;
                floor.length = floorDTO.length;
                floor.width = floorDTO.width;
                await this.floorRepo.save(floor);

                const floorDTOResult = FloorMap.toDTO(floor) as IFloorDTO;
                return Result.ok<IFloorDTO>(floorDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async verifyFloorExists(floorId: string): Promise<Result<boolean>> {
        try {
            const floor = await this.floorRepo.findByDomainId(floorId);

            if (floor === null) {
                return Result.fail<boolean>(false);
            } else {
                return Result.ok<boolean>(true);
            }
        } catch (e) {
            throw e;
        }
    }


}
