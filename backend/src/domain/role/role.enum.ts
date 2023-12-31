export enum Role {
  ADMIN = 'admin',
  USER = 'user',
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export const rolesArray: string[] = Object.values(Role);
