import { Service, Inject } from 'typedi';

import ITunnelRepo from '../services/IRepos/ITunnelRepo';
import { Tunnel } from '../domain/tunnel/tunnel';
import { TunnelId } from '../domain/tunnel/tunnelId';
import { TunnelMap } from '../mappers/TunnelMap';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITunnelPersistence } from '../dataschema/ITunnelPersistence';

@Service()
export default class TunnelRepo implements ITunnelRepo {
    private models: any;

    constructor(@Inject('tunnelSchema') private tunnelSchema: Model<ITunnelPersistence & Document>) {}

    private createBaseQuery(): any {
        return {
            where: {},
        };
    }

    public async exists(tunnel: Tunnel): Promise<boolean> {
        const idX = tunnel.id instanceof TunnelId ? (<TunnelId>tunnel.id).toValue() : tunnel.id;

        const query = { domainId: idX };
        const tunnelDocument = await this.tunnelSchema.findOne(query as FilterQuery<ITunnelPersistence & Document>);

        return !!tunnelDocument === true;
    }

    public async save(tunnel: Tunnel): Promise<Tunnel> {
        const query = { domainId: tunnel.id.toString() };

        const tunnelDocument = await this.tunnelSchema.findOne(query);

        try {
            if (tunnelDocument === null) {
                const rawTunnel: any = TunnelMap.toPersistence(tunnel);
                const tunnelCreated = await this.tunnelSchema.create(rawTunnel);

                return TunnelMap.toDomain(tunnelCreated);
            } else {
                tunnelDocument.description = tunnel.description;
                tunnelDocument.floor1Id = tunnel.floor1.id.toString();
                tunnelDocument.floor2Id = tunnel.floor2.id.toString();
                await tunnelDocument.save();

                return tunnel;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId(tunnelId: TunnelId | string): Promise<Tunnel> {
        const query = { domainId: tunnelId };
        const tunnelRecord = await this.tunnelSchema.findOne(query as FilterQuery<ITunnelPersistence & Document>);

        if (tunnelRecord != null) {
            return TunnelMap.toDomain(tunnelRecord);
        } else return null;
    }
}
