import { IReportCard } from "./IReportCard";
import { ISubjectResult } from "./ISubjectResult";

export interface ISemesterResult {
  id : number;
  semester : number;
  subjectResultList : ISubjectResult[];
  reportCard : IReportCard;
}
