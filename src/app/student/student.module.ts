import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListStudentComponent } from './list-student/list-student.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [ListStudentComponent, UpdateStudentComponent, CreateStudentComponent, ViewStudentComponent, ConfirmDeleteComponent],
  imports: [
    CommonModule,
    StudentRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class StudentModule { }
