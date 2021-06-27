import { IGrade } from './IGrade';
export interface ISchoolYear {
  id: number;
  beginYear: number;
  endYear: number;
  gradeList : IGrade[];
}
