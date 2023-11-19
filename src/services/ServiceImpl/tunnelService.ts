import { Service, Inject } from 'typedi';
import config from '../../../config';
import ITunnelDTO from '../../dto/ITunnelDTO';
import { Tunnel } from '../../domain/tunnel/tunnel';
import ITunnelRepo from '../IRepos/ITunnelRepo';
import ITunnelService from '../IServices/ITunnelService';
import { Result } from '../../core/logic/Result';
import { TunnelMap } from '../../mappers/TunnelMap';
import IFloorService from '../IServices/IFloorService';
import { forEach } from 'lodash';
import { FloorMap } from '../../mappers/FloorMap';
import IFloorDTO from '../../dto/IFloorDTO';

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
                const floor1Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor1Id);
                const floor2Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor2Id);
            
                if(!floor1Exists || !floor2Exists){
                    return Result.fail<ITunnelDTO>('Floor not found');
                }
                tunnel.description = tunnelDTO.description;
                tunnel.floor1 = await TunnelMap.getFloor(tunnelDTO.floor1Id);
                tunnel.floor2 = await TunnelMap.getFloor(tunnelDTO.floor2Id);
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
                    if(!floor1Exists){
                        return Result.fail<ITunnelDTO>('Floor not found');
                    }
                    tunnel.floor1 = await TunnelMap.getFloor(tunnelDTO.floor1Id);
                }
                if (tunnelDTO.floor2Id) {
                    const floor2Exists = await this.floorService.verifyFloorExists(tunnelDTO.floor2Id);
                    if(!floor2Exists){
                        return Result.fail<ITunnelDTO>('Floor not found');
                    }
                    tunnel.floor2 = await TunnelMap.getFloor(tunnelDTO.floor2Id);
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
        try{
            console.log("bomdia");
            const tunnels = await this.tunnelRepo.getAllTunnels();
            console.log(tunnels);
            

            const floor = tunnels.map( async (tunnel) => {
                const Floor = await TunnelMap.getFloor(tunnel.floor1.id.toString())
                return Floor}); 
                
            const floorv2 = tunnels.map( async (tunnel) => {
                const Floor = await TunnelMap.getFloor(tunnel.floor2.id.toString())
                return Floor}); 
                    
                
            let floor2 = await Promise.all(floor);
            const floor2v = await Promise.all(floorv2);
            
            
            floor2v.forEach((floor) => { 
                var a =false;
                
                floor2.forEach ((floorGang) => {
                    if(floor.id.equals(floorGang.id)){
                        a=true;
                    }
                });

                if(!a){
                    floor2.push(floor);
                }
                
                
            });
            
            console.log(floor2);
            const floorDTOs = await Promise.all(floor2.map(FloorMap.toDTO));
        
            //const tunnelDTOs = await Promise.all(tunnels.map(TunnelMap.toDTO));
            console.log(floorDTOs)
            return floorDTOs;
                
        
        }catch(e){
            throw e;
        }
    }

    public async getTunnels2B(): Promise<ITunnelDTO[]> {
        try{

            const tunnels = await this.tunnelRepo.getAllTunnels();
            



            const tunnelDTOs = await Promise.all(tunnels.map(TunnelMap.toDTO));
            return tunnelDTOs;
        }catch(e){
            throw e;
        }
    }






}
