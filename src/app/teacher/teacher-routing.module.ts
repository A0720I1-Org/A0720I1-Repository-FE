
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateTeacherComponent} from './create-teacher/create-teacher.component';
import {UpdateTeacherComponent} from './update-teacher/update-teacher.component';
import {ListTeacherComponent} from './list-teacher/list-teacher.component';
import {AuthGuard} from '../security/auth-guard';
import {StudentResultComponent} from "./student-result/student-result.component";


const routes: Routes = [
  {path: '', component: ListTeacherComponent},
  {
    path: 'create', component: CreateTeacherComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },

  {
    path: 'update', component: UpdateTeacherComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {path: 'update/:id', component: UpdateTeacherComponent},
  {path: '', component: ListTeacherComponent},
  {path: 'student-result', component: StudentResultComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
