import { IFloorPersistence } from '../../dataschema/IFloorPersistence';
import mongoose from 'mongoose';

const FloorSchema = new mongoose.Schema(
  {
    domainId: {type: String, unique: true},
    floorNumber: {type: Number},
    description: {type: String},
    length: {type: Number},
    width: {type: Number}
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);