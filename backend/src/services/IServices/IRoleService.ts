import { Result } from '../../core/logic/Result';
import IRoleDTO from '../../dto/IRoleDTO';

export default interface IRoleService {
  
  getAllRoles(): Promise<string[]>;
  getRole(roleId: string): Promise<Result<IRoleDTO>>;
}
