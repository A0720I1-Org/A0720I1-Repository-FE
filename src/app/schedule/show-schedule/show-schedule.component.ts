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


@Component({
  selector: 'app-show-schedule',
  templateUrl: './show-schedule.component.html',
  styleUrls: ['./show-schedule.component.scss']
})
export class ShowScheduleComponent implements OnInit {
  yearList: SchoolYear[] = null;
  gradeList: Grade[] = null;
  classList: StudentClass[] = null;
  classSearchData = new ClassSearchData();

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService
  ) { }

  ngOnInit(): void {
    this.getYearList();
    this.getGradeList();
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
    this.classSearchData.yearId = selectedYear.value;
  }


  getGradeId(selectedGrade) {
    this.classSearchData.gradeId = selectedGrade.value;
  }

  getClassList() {
    this.classStudentService.getClassesByYearAndGrade(this.classSearchData).subscribe(
      (data) => {
        this.classList =  data;
      }
    )
  }
}
