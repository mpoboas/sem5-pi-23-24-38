import mongoose from 'mongoose';
import { IClassroomPersistence } from '../../dataschema/IClassroomPersistence';

const ClassroomSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String },
    description: { type: String },
    category: { type: String },
    length: { type: Number },
    width: { type: Number },
    floorId: { type: String },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IClassroomPersistence & mongoose.Document>('Classroom', ClassroomSchema);
