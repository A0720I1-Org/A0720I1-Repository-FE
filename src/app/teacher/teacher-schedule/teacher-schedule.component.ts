import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../../service/teacher.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {TeacherScheduleDTO} from "../../dto/teacher/TeacherScheduleDTO";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.scss']
})
export class TeacherScheduleComponent implements OnInit {
  username: string;
  teacherSchedule: TeacherScheduleDTO[];
  lessonNumbers = [1,2,3,4,5,6,7,8];
  lessonDates = [2,3,4,5,6];

  constructor(
    private teacherService: TeacherService,
    private tokenStorageService: TokenStorageService,
  ) { }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().account.username;
    this.getTeacherSchedule();
  }

  getTeacherSchedule(){
    this.teacherService.getTeacherSchedule(this.username).subscribe(
      (data: TeacherScheduleDTO[]) => {
        this.teacherSchedule = data;

      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
