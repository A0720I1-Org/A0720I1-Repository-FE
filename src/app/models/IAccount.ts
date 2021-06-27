import { IAccountRole } from './IAccountRole';
export interface IAccount {
  id: number;
  userName: string;
  password: string;
  accountRoleList : IAccountRole[];
}
