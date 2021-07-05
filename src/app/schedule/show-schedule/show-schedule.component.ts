import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {GradeService} from "../../service/grade.service";
import {SchoolYearService} from "../../service/school-year.service";
import {ClassStudentService} from "../../service/class-student.service";
import {StudentClassDTO} from "../../dto/schedule/StudentClassDTO";
import {ISchoolYear} from "../../models/ISchoolYear";
import {IGrade} from "../../models/IGrade";
import {LessonDTO} from "../../dto/schedule/LessonDTO";
import {ScheduleService} from "../../service/schedule.service";
import {TeacherService} from "../../service/teacher.service";
import {TeacherDTO} from "../../dto/schedule/TeacherDTO";

@Component({
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.scss']
})
export class ShowScheduleComponent implements OnInit {
  listClass: StudentClassDTO[];
  id: number = 0;
  gradeId: number = 0;
  schoolYearId: number = 0;
  listSchoolYear: ISchoolYear[];
  listGrade: IGrade[];
  schedule: LessonDTO[];
  listTeacher: TeacherDTO[];
  lessonDates = [2, 3, 4, 5, 6];
  lessonNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  constructor(
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService,
    private scheduleService: ScheduleService,
    private teacherService: TeacherService,
  ) {

  }

  ngOnInit(): void {
    this.getAllSchoolYear();
    this.getAllGrade();
    this.getClassStudent();
  }
  getGradeId(selectedGrade) {
    this.gradeId = selectedGrade.value;
    this.getClassStudent();
  }
  getYearId(selectedYear) {
    this.schoolYearId = selectedYear.value;
  }
  getClassId(selectedClass) {
    this.id = selectedClass.value;
  }
  getAllSchoolYear() {
    this.schoolYearService.getAllSchoolYear().subscribe(
      (data: ISchoolYear[]) => {
        this.listSchoolYear = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
  getAllGrade() {
    this.gradeService.getAllGrade().subscribe(
      (data: IGrade[]) => {
        this.listGrade = data;
        // this.getClassStudent();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
  getClassStudent() {
    this.classStudentService.getClassStudent(this.gradeId, this.schoolYearId).subscribe(
      (data: StudentClassDTO[]) => {
        this.listClass = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }
  getSchedule() {
    this.scheduleService.getSchedule(this.id).subscribe(
      (data) => {
        this.schedule = data;
        console.log(data);
      },

      (error: HttpErrorResponse) => {
        console.log(error.message);
      }

    );
    console.log(this.id);
  }

  getTeacherForSubject() {
    this.teacherService.getTeacherForSubject(this.id).subscribe(
      (data) => {
        this.listTeacher = data;
        // console.log(data);
      },

      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
    console.log(this.id)
  }

}
