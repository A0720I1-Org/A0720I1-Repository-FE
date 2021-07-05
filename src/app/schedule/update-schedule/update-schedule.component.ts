import { Component, OnInit } from '@angular/core';
import {StudentClassDTO} from "../../dto/schedule/StudentClassDTO";
import {ClassStudentService} from "../../service/class-student.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-update-schedule',
  templateUrl: './update-schedule.component.html',
  styleUrls: ['./update-schedule.component.scss']
})
export class UpdateScheduleComponent implements OnInit {
  constructor(
              ) { }

  ngOnInit(): void {
  }

}
