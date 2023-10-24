import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        name: { type: String, unique: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
