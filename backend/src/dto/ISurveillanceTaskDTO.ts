export default interface ISurveillanceTaskDTO {
    id: string;
    building: string;
    floors: string[];
    emergencyContact: string;
    isPending: boolean;
    isApproved: boolean;
  }