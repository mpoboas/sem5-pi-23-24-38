import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';
import mongoose from 'mongoose';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    brand: { type: String },
    model: { type: String },
    tasks: [{ type: String }],
    designation: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
