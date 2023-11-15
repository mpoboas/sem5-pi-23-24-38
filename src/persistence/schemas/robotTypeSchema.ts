import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

var RobotTypeSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        brand: { type: String },
        model: { type: String },
        tasks: [{ type: String }]

    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
