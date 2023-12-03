import mongoose from 'mongoose';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const ElevatorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    floors: [{ type: String }],
    buildingId: { type: String, unique: true },
    cordx: { type: Number },
    cordy: { type: Number },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
