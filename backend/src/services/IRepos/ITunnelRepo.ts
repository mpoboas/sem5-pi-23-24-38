import { Repo } from "../../core/infra/Repo";
import { Tunnel } from "../../domain/tunnel/tunnel";
import { TunnelId } from "../../domain/tunnel/tunnelId";

export default interface ITunnelRepo extends Repo<Tunnel> {
    save(tunnel: Tunnel): Promise<Tunnel>;
    findByDomainId (tunnelId: TunnelId | string): Promise<Tunnel>;
    getAllTunnels(): Promise<Tunnel[]>;
    //findByIds (tunnelsIds: TunnelId[]): Promise<Tunnel[]>;
    //saveCollection (tunnels: Tunnel[]): Promise<Tunnel[]>;
    //removeByTunnelIds (tunnels: TunnelId[]): Promise<any>
}
