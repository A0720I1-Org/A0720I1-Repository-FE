import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { RouterModule } from '@angular/router';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [ChangePasswordComponent, UpdateInfoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ]
})
export class SecurityModule { }
