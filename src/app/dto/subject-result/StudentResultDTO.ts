import { IStudentResultDTO } from './IStudentResultDTO';

export class StudentResulDTO implements IStudentResultDTO{
  studentId: number ;
  name :string ;
  markCol1: number ;
  markCol2: number ;
  markCol3: number ;
  multiplier: number ;
  birthday : string ;
}
