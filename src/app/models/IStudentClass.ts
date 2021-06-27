
import { IReportCard } from './IReportCard';
import { IGrade } from './IGrade';
import { ISchedule } from './ISchedule';
import { ITeacher } from '../entity/ITeacher';
export interface IStudentClass {
  id: number;
  name: string;
  grade: IGrade;

  reportCardList : IReportCard[];
  schedule : ISchedule ;
  teacher : ITeacher ;
}
