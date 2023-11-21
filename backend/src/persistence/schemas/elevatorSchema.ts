import mongoose from 'mongoose';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const ElevatorSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    x: { type: Number },
    y: { type: Number },
    buildingId: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', ElevatorSchema);
