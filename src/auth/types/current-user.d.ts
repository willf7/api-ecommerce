import { Role } from '../enums/role.enum';

export type CurrentUser = {
  id: string;
  role: Role;
};
