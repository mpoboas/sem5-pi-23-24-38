export enum Role {
  ADMIN = 'admin',
  CAMPUS_MANAGER = 'campus_manager',
  FLEET_MANAGER = 'fleet_manager',
  TASK_MANAGER = 'task_manager',
  TEACHER = 'teacher',
  STUDENT = 'student',
  USER = 'user',
}

export const rolesArray: string[] = Object.values(Role);
