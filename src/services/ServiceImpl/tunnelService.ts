import { Service, Inject } from 'typedi';
import config from '../../../config';
import ITunnelDTO from '../../dto/ITunnelDTO';
import { Tunnel } from '../../domain/tunnel/tunnel';
import ITunnelRepo from '../IRepos/ITunnelRepo';
import ITunnelService from '../IServices/ITunnelService';
import { Result } from '../../core/logic/Result';
import { TunnelMap } from '../../mappers/TunnelMap';
import IFloorService from '../IServices/IFloorService';

@Service()
export default class TunnelService implements ITunnelService {
    constructor(@Inject(config.repos.tunnel.name) private tunnelRepo: ITunnelRepo,
                @Inject(config.services.floor.name) private floorService: IFloorService) {}

    public async getTunnel(tunnelId: string): Promise<Result<ITunnelDTO>> {
        try {
            const tunnel = await this.tunnelRepo.findByDomainId(tunnelId);

            if (tunnel === null) {
                return Result.fail<ITunnelDTO>('Tunnel not found');
            } else {
                const tunnelDTOResult = TunnelMap.toDTO(tunnel) as ITunnelDTO;
                return Result.ok<ITunnelDTO>(tunnelDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }

    public async createTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>> {
        try {

            const floor1Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor1Id);
            const floor2Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor2Id);
            
            if(!floor1Exists || !floor2Exists){

                return Result.fail<ITunnelDTO>('Floor not found');
            }
            const tunnel = await TunnelMap.toDomain(tunnelDTO);


            const tunnelCreated = await this.tunnelRepo.save(tunnel);

            if (tunnelCreated === null) {
                return Result.fail<ITunnelDTO>('Tunnel already exists');
            }
            const tunnelDTOResult = TunnelMap.toDTO(tunnel) as ITunnelDTO;
            return Result.ok<ITunnelDTO>(tunnelDTOResult);
            
           

        } catch (e) {
            return Result.fail<ITunnelDTO>(e.message);
        }
    }

    public async updateTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>> {
        try {
            const tunnel = await this.tunnelRepo.findByDomainId(tunnelDTO.id);

            if (tunnel === null) {
                return Result.fail<ITunnelDTO>('Tunnel not found');
            } else {
                tunnel.description = tunnelDTO.description;
                await this.tunnelRepo.save(tunnel);

                const tunnelDTOResult = TunnelMap.toDTO(tunnel) as ITunnelDTO;
                return Result.ok<ITunnelDTO>(tunnelDTOResult);
            }
        } catch (e) {
            throw e;
        }
    }
}
