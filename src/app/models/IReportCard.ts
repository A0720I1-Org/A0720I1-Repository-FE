import { ISemesterResult } from './ISemesterResult';
import { IStudent } from './IStudent';
import { IStudentClass } from './IStudentClass';
export interface IReportCard {
  id: number;
  student : IStudent ;
  studentClass : IStudentClass ;
  semesterResultList : ISemesterResult[];
}
