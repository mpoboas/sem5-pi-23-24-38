export default interface IPickupDeliveryTaskDTO {
    id: string;
    pickupClassroom: string;
    deliveryClassroom: string;
    pickupContact: string;
    deliveryContact: string;
    confirmationCode: number;
    deliveryDescription: string;
    isPending: boolean;
    isApproved: boolean;
  }