import { Result } from '../../core/logic/Result';
import ITunnelDTO from '../../dto/ITunnelDTO';

export default interface ITunnelService {
    createTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>>;
    updateTunnel(tunnelDTO: ITunnelDTO): Promise<Result<ITunnelDTO>>;

    getTunnel(tunnelId: string): Promise<Result<ITunnelDTO>>;
}
