
import {CreateStudentComponent} from './create-student/create-student.component';
import {AuthGuard} from '../security/auth-guard';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: '', component: CreateStudentComponent},
  {
    path: 'create', component: CreateStudentComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ADMIN']
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
