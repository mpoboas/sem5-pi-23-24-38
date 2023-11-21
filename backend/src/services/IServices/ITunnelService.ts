import { Result } from '../../core/logic/Result';
import IFloorDTO from '../../dto/IFloorDTO';
import ITunnelDTO from '../../dto/ITunnelDTO';

export default interface ITunnelService {
  createTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>>;
  updateTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>>;
  patchTunnel(tunnelId: string, tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>>;
  getTunnel(tunnelId: string): Promise<Result<ITunnelDTO>>;
  getAllTunnelsFloors(): Promise<IFloorDTO[]>;
  getTunnels2B(): Promise<ITunnelDTO[]>;
}
