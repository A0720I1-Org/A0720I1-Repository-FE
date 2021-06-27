import { ILessonTIme } from './ILessonTime';

import { ISubject } from './ISubject';
import { ISchedule } from './ISchedule';
import { ITeacher } from '../entity/ITeacher';
export interface ILesson {
  id : number ;
  subject : ISubject ;
  teacher : ITeacher ;
  lessonTime : ILessonTIme ;
  schedule : ISchedule ;
}
