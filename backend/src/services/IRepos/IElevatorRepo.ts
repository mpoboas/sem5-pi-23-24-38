import { Repo } from '../../core/infra/Repo';
import { Elevator } from '../../domain/elevator/elevator';

export default interface IElevatorRepo extends Repo<Elevator> {
  save(elevator: Elevator): Promise<Elevator>;
  findByDomainId(elevatorId: string): Promise<Elevator>;
  getAllElevators(): Promise<Elevator[]>;

  //findByIds (elevatorsIds: string[]): Promise<Elevator[]>;
  //saveCollection (elevators: Elevator[]): Promise<Elevator[]>;
  //removeByElevatorIds (elevators: string[]): Promise<any>
}
