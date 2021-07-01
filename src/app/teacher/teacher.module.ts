import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TeacherRoutingModule} from './teacher-routing.module';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule} from '@angular/common/http';
import {ViewTeacherComponent} from './view-teacher/view-teacher.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ToastrModule} from "ngx-toastr";
import {StudentResultComponent} from './student-result/student-result.component';
import { ListHomeroomClassComponent } from './list-homeroom-class/list-homeroom-class.component';
import { ViewDetailStudentComponent } from './view-detail-student/view-detail-student.component';
import { TeacherScheduleComponent } from './teacher-schedule/teacher-schedule.component';

@NgModule({
  declarations: [
    ListTeacherComponent,
    UpdateTeacherComponent,
    CreateTeacherComponent,
    ViewTeacherComponent,
    StudentResultComponent,
    ListHomeroomClassComponent,
    ViewDetailStudentComponent,
    TeacherScheduleComponent
  ],
  exports: [
    CreateTeacherComponent,
    UpdateTeacherComponent,
  ],

  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgbPaginationModule,
    NgxPaginationModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot()
  ]
})
export class TeacherModule {
}
