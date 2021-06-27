import { IAccountRole } from './IAccountRole';
export interface IRole {
  id: number;
  name: string;
  accountRoleList : IAccountRole[];
}
