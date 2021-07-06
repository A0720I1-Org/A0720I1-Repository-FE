import {Component, OnInit} from '@angular/core';
import {ScheduleSubject} from "../../dto/schedule/ScheduleSubject";
import {ScheduleService} from "../../service/schedule.service";
import {ActivatedRoute} from "@angular/router";
import {ClassStudentService} from "../../service/class-student.service";
import {ScheduleClass} from "../../dto/schedule/ScheduleClass";
import {Lesson} from "../../dto/schedule/Lesson";
import {ScheduleTeacher} from "../../dto/schedule/ScheduleTeacher";
import {ScheduleShowLesson} from "../../dto/schedule/ScheduleShowLesson";
import {ToastrService} from "ngx-toastr";
import {TeacherSubject} from "../../dto/schedule/TeacherSubject";
import {AssignedTeacherError} from "../../dto/schedule/AssignedTeacherError";

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss']
})
export class UpdateScheduleComponent implements OnInit {
  lessonNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  lessonDates = [2, 3, 4, 5, 6];
  subjectList: ScheduleSubject[] = []
  assignedSubjectList: ScheduleSubject[] = []
  schedule: Lesson[] = []
  classId: number;
  scheduleClass: ScheduleClass = new ScheduleClass();
  subjectInSchedule = new Map();
  teacherList: ScheduleTeacher[] = [];
  // currentSchedule: ScheduleShowLesson[];
  currentSchedule: Lesson[];
  currentTeacherSubjectList: TeacherSubject[];
  isChanged = true;
  assignedTeacherErrorList: AssignedTeacherError[];

  constructor(
    private scheduleService: ScheduleService,
    private classStudentService: ClassStudentService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getClassName();
    this.getSubjectList()
    this.getTeacherList();
    this.getCurrentSchedule();
    this.getCurrentTeacherSubjectList();
  }

  getClassName() {
    this.classId = this.activatedRoute.snapshot.params['id'];
    this.classStudentService.getClassNameByClassId(this.classId).subscribe(
      (data) => this.scheduleClass = data
    )
  }

  getSubjectList() {
    this.scheduleService.getAllSubject().subscribe(
      (data) => {
        this.subjectList = data
      }
    )
  }

  getCurrentSchedule() {
    this.classId = this.activatedRoute.snapshot.params['id'];
    this.scheduleService.getScheduleByClassId(this.classId).subscribe(
      (data) => {
        this.schedule = data;
        this.currentSchedule = data;
      }
    )
  }

  getCurrentTeacherSubjectList() {
    this.classId = this.activatedRoute.snapshot.params['id'];
    this.scheduleService.getTeacherSubjectByClassId(this.classId).subscribe(
      (data) => {
        this.assignedSubjectList = data;
        this.currentTeacherSubjectList = data
      }
    )
  }

  getTeacherList() {
    this.scheduleService.getAllTeacher().subscribe(
      (data) => this.teacherList = data
    )
  }

  selectSubject() {
    this.schedule = [];
    this.subjectInSchedule.clear();
    for (let lessonDate of this.lessonDates) {
      for (let lessonNumber of this.lessonNumbers) {
        let id = String(lessonDate) + String(lessonNumber)
        const subjectId = (<HTMLInputElement>document.getElementById(id)).value;
        if (subjectId != "") {
          this.schedule.push(new Lesson(lessonDate, lessonNumber, Number.parseInt(subjectId)))
        }
      }
    }
    for (let lesson of this.schedule) {
      for (let subject of this.subjectList) {
        if (lesson.subjectId == subject.subjectId) {
          this.subjectInSchedule.set(subject, null);
        }
      }
    }
    if (this.subjectInSchedule != null) {
      this.assignedSubjectList = Array.from(this.subjectInSchedule.keys());
    }
    this.isChanged = false;
  }

  selectTeacher() {
    for (let subject of this.assignedSubjectList) {
      const teacherId = (<HTMLInputElement>document.getElementById(subject.subjectName)).value;
      for (let lesson of this.schedule) {
        if (lesson.subjectId == subject.subjectId) {
          lesson.teacherId = Number.parseInt(teacherId);
        }
      }
    }
    this.isChanged = false;
  }

  onSubmit() {
    this.assignedTeacherErrorList = [];
    this.classId = this.activatedRoute.snapshot.params['id'];
    this.selectSubject();
    this.selectTeacher();
    this.scheduleService.saveSchedule(this.classId, this.schedule).subscribe(
      (data) => {
        this.toastrService.success(
          "Cập nhật thành công thời khóa biểu",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500})
      },
      err => {
        this.assignedTeacherErrorList = err.error;
        this.toastrService.error(
          "Không thể cập nhật thời khóa biểu",
          "Có lỗi xảy ra",
          {timeOut: 3000, extendedTimeOut: 1500}
        )
      }
    )
  }

  valueOfOption(lessonDate, lessonNumber, subjectId) {
    if (this.currentSchedule != null) {
      for (let lesson of this.currentSchedule) {
        if (lesson.lessonDate == lessonDate && lesson.lessonNumber == lessonNumber && lesson.subjectId == subjectId) {
          return true;
        }
      }
    }
    return false;
  }

  isTeacherSelected(subjectId: number, teacherId: number) {
    for (let teacher of this.currentTeacherSubjectList) {
      if (teacher.subjectId == subjectId && teacher.teacherId == teacherId) {
        return true;
      }
    }
    return false;
  }
}
