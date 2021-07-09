export class Lesson {
  lessonDate: number;
  lessonNumber: number;
  subjectId: number;
  teacherId: number


  constructor(lessonDate: number, lessonNumber: number, subjectId: number) {
    this.lessonDate = lessonDate;
    this.lessonNumber = lessonNumber;
    this.subjectId = subjectId;
  }
}
