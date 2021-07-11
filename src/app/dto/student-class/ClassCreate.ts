export class ClassCreate {
  schoolYearId: number;
  gradeId: number;
  name: string;


  constructor(schoolYearId: number, gradeId: number, name: string) {
    this.schoolYearId = schoolYearId;
    this.gradeId = gradeId;
    this.name = name;
  }
}

