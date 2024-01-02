export default interface IPickupDeliveryTaskDTO {
    id: string;
    building: string;
    floors: string[];
    emergencyContact: string;
    isPending: boolean;
    isApproved: boolean;
  }