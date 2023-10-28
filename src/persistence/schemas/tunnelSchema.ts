import { ITunnelPersistence } from '../../dataschema/ITunnelPersistence';
import mongoose from 'mongoose';

const TunnelSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        description: { type: String, unique: true },
        floor1Id: { type: String, required: true },
        floor2Id: { type: String, required: true},
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITunnelPersistence & mongoose.Document>('Tunnel', TunnelSchema);
