import { Service, Inject } from 'typedi';
import config from '../../../config';
import IRoleDTO from '../../dto/IRoleDTO';
import { rolesArray } from '../../domain/role/role.enum';
import IRoleRepo from '../IRepos/IRoleRepo';
import IRoleService from '../IServices/IRoleService';
import { Result } from '../../core/logic/Result';
import { RoleMap } from '../../mappers/RoleMap';

@Service()
export default class RoleService implements IRoleService {
  constructor(@Inject(config.repos.role.name) private roleRepo: IRoleRepo) {}

  public async getRole(roleId: string): Promise<Result<IRoleDTO>> {
    try {
      const role = await this.roleRepo.findByDomainId(roleId);

      if (role === null) {
        return Result.fail<IRoleDTO>('Role not found');
      } else {
        const roleDTOResult = RoleMap.toDTO(role) as IRoleDTO;
        return Result.ok<IRoleDTO>(roleDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllRoles(): Promise<string[]> {
    try {
      return rolesArray;
    } catch (e) {
      throw e;
    }
  }
}
