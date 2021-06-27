import { ISubjectResult } from "./ISubjectResult";

export interface ISubject {
  id : number ;
  name : string ;
  subjectResultList? : ISubjectResult[] ;
}
