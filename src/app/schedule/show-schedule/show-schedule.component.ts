import { Component, OnInit } from '@angular/core';
import {SchoolYear} from "../../dto/schedule/SchoolYear";
import {ScheduleService} from "../../service/schedule.service";
import {Router} from "@angular/router";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";
import {SchoolYearService} from "../../service/school-year.service";
import {GradeService} from "../../service/grade.service";
import {Grade} from "../../dto/schedule/Grade";
import {ClassSearchData} from "../../dto/schedule/ClassSearchData";
import {ClassStudentService} from "../../service/class-student.service";
import {StudentClass} from "../../dto/schedule/StudentClass";
import {ScheduleShowLesson} from "../../dto/schedule/ScheduleShowLesson";
import {TeacherSubject} from "../../dto/schedule/TeacherSubject";
import {TokenStorageService} from "../../service/token-storage.service";


@Component({
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.scss']
})
export class ShowScheduleComponent implements OnInit {
  yearList: SchoolYear[] = null;
  gradeList: Grade[] = null;
  classList: StudentClass[] = null;
  classId: number = 0;
  yearId: number = 0;
  gradeId: number = 0;
  schedule: ScheduleShowLesson[];
  lessonNumbers = [1,2,3,4,5,6,7,8];
  lessonDates = [2,3,4,5,6];
  teacherSubjectList: TeacherSubject[];
  role: string

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.getYearList();
    this.getGradeList();
    this.role = this.tokenStorageService.getUser().roles[0];
  }

  getYearList() {
    this.schoolYearService.getAllSchoolYear().subscribe(
      (data) => {
        this.yearList = data;
      }
    )
  }

  getGradeList() {
    this.gradeService.getAllGrades().subscribe(
      (data) => {
        this.gradeList = data;
      }
    )
  }

  getYearId(selectedYear) {
    this.yearId = selectedYear.value;
  }


  getGradeId(selectedGrade) {
    this.gradeId = selectedGrade.value;
  }

  getClassList() {
    this.classStudentService.getClassesByYearAndGrade(this.yearId, this.gradeId).subscribe(
      (data) => {
        this.classList =  data;
      }
    )
  }

  selectClass(selectedClass) {
    this.classId = selectedClass.value;
  }

  showSchedule() {
    this.scheduleService.getScheduleByClassId(this.classId).subscribe(
      (data) => {
        this.schedule = data;
      },
      error => {
        this.toastrService.error(
          "Có lỗi xảy ra",
          "Lỗi",
          {timeOut: 3000, extendedTimeOut: 1500})
      }
    )
    this.scheduleService.getTeacherSubjectByClassId(this.classId).subscribe(
      (data) => {
        this.teacherSubjectList = data
      },
      error => {
        this.toastrService.error(
          "Có lỗi xảy ra",
          "Lỗi",
          {timeOut: 3000, extendedTimeOut: 1500})
      }
    )
  }
}
