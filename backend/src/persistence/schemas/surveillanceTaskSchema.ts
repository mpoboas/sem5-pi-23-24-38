import mongoose from 'mongoose';
import { ISurveillanceTaskPersistence } from '../../dataschema/ISurveillanceTaskPersistence';

const SurveillanceTaskSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        building: { type: String },
        floors: { type: String, default: [] },
        emergencyContact: { type: String },
        isPending: { type: Boolean },
        isApproved: { type: Boolean },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<ISurveillanceTaskPersistence & mongoose.Document>('SurveillanceTask', SurveillanceTaskSchema);