import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassStudentRoutingModule } from './class-student-routing.module';
import { CreateClassStudentComponent } from './create-class-student/create-class-student.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CreateStudentComponent } from './create-student/create-student.component';


@NgModule({
  declarations: [CreateClassStudentComponent, CreateStudentComponent],
  imports: [
    CommonModule,
    ClassStudentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClassStudentModule { }
