import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    nickname: { type: String, unique: true },
    serialNr: { type: String },
    description: { type: String },
    isActive: { type: Boolean },
    robotTypeId: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
