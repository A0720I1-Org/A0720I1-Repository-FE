import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassStudentRoutingModule } from './class-student-routing.module';
import { CreateClassStudentComponent } from './create-class-student/create-class-student.component';


@NgModule({
  declarations: [CreateClassStudentComponent],
  imports: [
    CommonModule,
    ClassStudentRoutingModule
  ]
})
export class ClassStudentModule { }
