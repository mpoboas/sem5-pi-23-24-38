import { IUserPersistence } from '../../dataschema/IUserPersistence';
import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: [true, 'Please enter a name'],
      index: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },

    password: String,

    phoneNumber: {
      type: String,
      required: [true, 'Please enter a phone number'],
      index: true,
    },

    nif: {
      type: String,
      required: true,
      index: true,
    },

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
