
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {AuthGuard} from '../security/auth-guard';
import {StudentResultComponent} from "./student-result/student-result.component";
import {ListHomeroomClassComponent} from "./list-homeroom-class/list-homeroom-class.component";
import {TeacherScheduleComponent} from "./teacher-schedule/teacher-schedule.component";


const routes: Routes = [
  {path: '', component: ListTeacherComponent},
  {
    path: 'create', component: CreateTeacherComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },

  {
    path: 'update', component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {path: 'update/:id', component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: '', component: ListTeacherComponent}, //Cai list teacher ai cung xem duoc nen khong can
  {path: 'student-result', component: StudentResultComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_TEACHER', "ROLE_STUDENT"]
    }},
  {path: 'homeroom-class', component: ListHomeroomClassComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_TEACHER']
    }},
  {path: 'teacher-schedule', component: TeacherScheduleComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_TEACHER'] //Quy dinh role nao duoc truy cap vao component nay
    }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
