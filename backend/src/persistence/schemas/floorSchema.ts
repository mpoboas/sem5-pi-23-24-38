import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    floorNumber: { type: String },
    description: { type: String },
    length: { type: Number },
    width: { type: Number },
    buildingId: { type: String },
    map: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
