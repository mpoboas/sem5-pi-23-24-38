export interface ISurveillanceTaskPersistence {
    domainId: string;
    building: string;
    floors: string[];
    emergencyContact: string;
    isPending: boolean;
    isApproved: boolean;
}