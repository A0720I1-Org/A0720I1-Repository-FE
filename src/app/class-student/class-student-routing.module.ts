import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateClassStudentComponent} from "./create-class-student/create-class-student.component";
import {CreateStudentComponent} from "./create-student/create-student.component";


const routes: Routes = [
  {path: 'create-class', component: CreateClassStudentComponent},
  {path: 'create-student', component: CreateStudentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassStudentRoutingModule { }
