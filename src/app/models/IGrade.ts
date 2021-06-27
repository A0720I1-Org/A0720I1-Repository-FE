import { ISchoolYear } from './ISchoolYear';
export interface IGrade {
  id: number;
  name: string;
  password: string;
  schoolYear : ISchoolYear ;
}
