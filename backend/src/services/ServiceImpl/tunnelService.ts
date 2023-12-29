import { Service, Inject } from 'typedi';
import config from '../../../config';
import ITunnelDTO from '../../dto/ITunnelDTO';
import ITunnelRepo from '../IRepos/ITunnelRepo';
import ITunnelService from '../IServices/ITunnelService';
import { Result } from '../../core/logic/Result';
import { TunnelMap } from '../../mappers/TunnelMap';
import IFloorService from '../IServices/IFloorService';
import { FloorMap } from '../../mappers/FloorMap';
import IFloorDTO from '../../dto/IFloorDTO';
import IBuildingService from '../IServices/IBuildingService';
import { floor } from 'lodash';

@Service()
export default class TunnelService implements ITunnelService {
  constructor(
    @Inject(config.repos.tunnel.name) private tunnelRepo: ITunnelRepo,
    @Inject(config.services.floor.name) private floorService: IFloorService,
    @Inject(config.services.building.name) private buildingService: IBuildingService,
  ) {}

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

      if (!floor1Exists || !floor2Exists) {
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
        const floor1Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor1Id);
        const floor2Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor2Id);

        if (!floor1Exists || !floor2Exists) {
          return Result.fail<ITunnelDTO>('Floor not found');
        }
        tunnel.description = tunnelDTO.description;
        tunnel.floor1 = await TunnelMap.getFloor(tunnelDTO.floor1Id);
        tunnel.floor2 = await TunnelMap.getFloor(tunnelDTO.floor2Id);
        tunnel.location1 = tunnelDTO.location1;
        tunnel.location2 = tunnelDTO.location2;
        await this.tunnelRepo.save(tunnel);

        const tunnelDTOResult = TunnelMap.toDTO(tunnel) as ITunnelDTO;
        return Result.ok<ITunnelDTO>(tunnelDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async patchTunnel(tunnelId: string, tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>> {
    try {
      const tunnel = await this.tunnelRepo.findByDomainId(tunnelId);

      if (tunnel === null) {
        return Result.fail<ITunnelDTO>('Tunnel not found');
      } else {
        if (tunnelDTO.description) {
          tunnel.description = tunnelDTO.description;
        }
        if (tunnelDTO.floor1Id) {
          const floor1Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor1Id);
          if (!floor1Exists) {
            return Result.fail<ITunnelDTO>('Floor not found');
          }
          tunnel.floor1 = await TunnelMap.getFloor(tunnelDTO.floor1Id);
        }
        if (tunnelDTO.floor2Id) {
          const floor2Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor2Id);
          if (!floor2Exists) {
            return Result.fail<ITunnelDTO>('Floor not found');
          }
          tunnel.floor2 = await TunnelMap.getFloor(tunnelDTO.floor2Id);
        }
        if (tunnelDTO.location1) {
          tunnel.location1 = tunnelDTO.location1;
        }
        if (tunnelDTO.location2) {
          tunnel.location2 = tunnelDTO.location2;
        }
        await this.tunnelRepo.save(tunnel);

        const tunnelDTOResult = TunnelMap.toDTO(tunnel) as ITunnelDTO;
        return Result.ok<ITunnelDTO>(tunnelDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getAllTunnelsFloors(): Promise<IFloorDTO[]> {
    try {
      const tunnels = await this.tunnelRepo.getAllTunnels();

      const floor = tunnels.map(async tunnel => {
        const Floor = await TunnelMap.getFloor(tunnel.floor1.id.toString());
        return Floor;
      });

      const floorv2 = tunnels.map(async tunnel => {
        const Floor = await TunnelMap.getFloor(tunnel.floor2.id.toString());
        return Floor;
      });

      const floor2 = await Promise.all(floor);
      const floor2v = await Promise.all(floorv2);

      floor2v.forEach(floor => {
        let a = false;

        floor2.forEach(floorGang => {
          if (floor.id.equals(floorGang.id)) {
            a = true;
          }
        });

        if (!a) {
          floor2.push(floor);
        }
      });

      const floorDTOs = await Promise.all(floor2.map(FloorMap.toDTO));

      //const tunnelDTOs = await Promise.all(tunnels.map(TunnelMap.toDTO));
      return floorDTOs;
    } catch (e) {
      throw e;
    }
  }

  public async getTunnels2B(): Promise<ITunnelDTO[]> {
    try {
      const tunnels = await this.tunnelRepo.getAllTunnels();

      const tunnelDTOs = await Promise.all(tunnels.map(TunnelMap.toDTO));
      return tunnelDTOs;
    } catch (e) {
      throw e;
    }
  }

  public async getTunnelsAlgav(): Promise<any[]> {
    try {
      const tunnelsResult: any[] = [];
      const tunnels = await this.tunnelRepo.getAllTunnels();
      for(const tunnel of tunnels) {
        const floor1 = await TunnelMap.getFloor(tunnel.floor1.id.toString());
        const floor2 = await TunnelMap.getFloor(tunnel.floor2.id.toString());
      
        tunnelsResult.push({building1: floor1.buildingId.toString(), building2: floor2.buildingId.toString(), floor1: floor1.id.toString(), floor2: floor2.id.toString()});
      }
    
      return tunnelsResult
    } catch (e) {
      throw e;
    }
  }

  public async getTunnelsAlgav2(): Promise<any[]> {
    try {
      const tunnelsResult: any[] = [];
      const tunnels = await this.tunnelRepo.getAllTunnels();
      for(const tunnel of tunnels) {
        const floor1 = await TunnelMap.getFloor(tunnel.floor1.id.toString());
        const floor2 = await TunnelMap.getFloor(tunnel.floor2.id.toString());
        const location1 = tunnel.location1;
        const location2 = tunnel.location2;
        const tunnel1 = floor1.id.toString()+floor2.id.toString();
        const tunnel2 = floor2.id.toString()+floor1.id.toString();

        tunnelsResult.push({tunnel: tunnel1, x: location1[0], y: location1[1], floor: floor1.id.toString()});
        tunnelsResult.push({tunnel: tunnel2, x: location2[0], y: location2[1], floor: floor2.id.toString()});
      }
    
      return tunnelsResult
    }catch(e) {
      throw e;  
    }
  }
}


