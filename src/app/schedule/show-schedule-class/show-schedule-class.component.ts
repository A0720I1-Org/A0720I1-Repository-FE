import { Component, OnInit } from '@angular/core';
import {SchoolYear} from "../../dto/schedule/SchoolYear";
import {Grade} from "../../dto/schedule/Grade";
import {StudentClass} from "../../dto/schedule/StudentClass";
import {ScheduleShowLesson} from "../../dto/schedule/ScheduleShowLesson";
import {TeacherSubject} from "../../dto/schedule/TeacherSubject";
import {ScheduleService} from "../../service/schedule.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";
import {SchoolYearService} from "../../service/school-year.service";
import {GradeService} from "../../service/grade.service";
import {ClassStudentService} from "../../service/class-student.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {ScheduleClass} from "../../dto/schedule/ScheduleClass";

@Component({
  selector: 'app-show-schedule-class',
  templateUrl: './show-schedule-class.component.html',
  styleUrls: ['./show-schedule-class.component.scss']
})
export class ShowScheduleClassComponent implements OnInit {
  classList: StudentClass[] = null;
  classId: number = 0;
  schedule: ScheduleShowLesson[];
  lessonNumbers = [1,2,3,4,5,6,7,8];
  lessonDates = [2,3,4,5,6];
  teacherSubjectList: TeacherSubject[];
  scheduleClass: ScheduleClass = new ScheduleClass();
  role: string

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService,
    private tokenStorageService: TokenStorageService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0];
    this.getClassName()
    this.showSchedule()
  }

  getClassName() {
    this.classId = this.activatedRoute.snapshot.params['id'];
    this.classStudentService.getClassNameByClassId(this.classId).subscribe(
      (data) => this.scheduleClass = data
    )
  }

  showSchedule() {
    this.classId = this.activatedRoute.snapshot.params['id'];
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
