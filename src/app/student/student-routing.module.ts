
import {CreateStudentComponent} from './create-student/create-student.component';
import {AuthGuard} from '../security/auth-guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListTeacherComponent} from "../teacher/list-teacher/list-teacher.component";
import {CreateTeacherComponent} from "../teacher/create-teacher/create-teacher.component";
import {UpdateTeacherComponent} from "../teacher/update-teacher/update-teacher.component";
import {ListStudentComponent} from "./list-student/list-student.component";
import {UpdateStudentComponent} from "./update-student/update-student.component";

const routes: Routes = [
  {
    path: 'create', component: CreateStudentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {
    path: 'update', component: UpdateStudentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  },
  {path: 'update/:id', component: UpdateStudentComponent},
  {path: '', component: ListStudentComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
