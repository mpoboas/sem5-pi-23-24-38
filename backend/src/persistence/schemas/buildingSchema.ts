import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    letter: { type: String },
    length: { type: Number },
    width: { type: Number },
    description: { type: String },
    code: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
