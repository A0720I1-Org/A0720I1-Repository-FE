import { IStudentClass } from './IStudentClass';
import { ILesson } from './ILesson';
export interface ISchedule {
  id : number ;
  studentClass : IStudentClass[] ;
  lessonList : ILesson[] ;
}
