import mongoose from 'mongoose';
import { IPickupDeliveryTaskPersistence } from '../../dataschema/IPickupDeliveryTaskPersistence';

const PickupDeliveryTaskSchema = new mongoose.Schema(
    {
        domainId: { type: String, unique: true },
        pickupClassroom: { type: String },
        deliveryClassroom: { type: String },
        pickupContact: { type: String },
        deliveryContact: { type: String },
        confirmationCode: { type: String },
        deliveryDescription: { type: String },
        isPending: { type: Boolean },
        isApproved: { type: Boolean },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model<IPickupDeliveryTaskPersistence & mongoose.Document>('PickupDeliveryTask', PickupDeliveryTaskSchema);