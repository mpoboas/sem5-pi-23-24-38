import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { ITunnelPersistence } from '../dataschema/ITunnelPersistence';

import ITunnelDTO from '../dto/ITunnelDTO';
import { Tunnel } from '../domain/tunnel/tunnel';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { Container } from 'typedi';
import FloorRepo from '../repos/floorRepo';

export class TunnelMap extends Mapper<Tunnel> {
    public static toDTO(tunnel: Tunnel): ITunnelDTO {
        const tunnelDTO: ITunnelDTO = {
            id: tunnel.id.toString(),
            description: tunnel.description,
            floor1Id: tunnel.floor1.id.toString(),
            floor2Id: tunnel.floor2.id.toString(),
        };
        return tunnelDTO;            

    }

    public static async toDomain(tunnelDTO:any): Promise<Tunnel> {
        const floorRepo = Container.get(FloorRepo);
        const floor1Id = await floorRepo.findByDomainId(tunnelDTO.floor1Id);
        const floor2Id = await floorRepo.findByDomainId(tunnelDTO.floor2Id);
        if (!floor1Id || !floor2Id) {
            throw new ReferenceError("Floor not found");
        }
        const tunnelOrError = Tunnel.create({
            description: tunnelDTO.description,
            floor1: floor1Id,
            floor2: floor2Id,
            
            },
            new UniqueEntityID(tunnelDTO.domainId));
        return tunnelOrError.isSuccess ? tunnelOrError.getValue() : null;

    }

    public static toPersistence(tunnel: Tunnel): any {
        return {
            domainId: tunnel.id.toString(),
            description: tunnel.description,
            floor1Id: tunnel.floor1.id.toValue(),
            floor2Id: tunnel.floor2.id.toValue(),
        };
    }
}
