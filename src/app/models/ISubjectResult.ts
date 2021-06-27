import { ISemesterResult } from "./ISemesterResult";
import { ISubject } from "./ISubject";

export interface ISubjectResult {
  id : number ;
  subject : ISubject ;
  semesterResult : ISemesterResult ;
  mark1x : number ;
  mark2x : number ;
  mark3x : number ;
}
