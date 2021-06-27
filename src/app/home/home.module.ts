import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {LoginComponent} from './login/login.component';
import {HomePageComponent} from './home-page/home-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [LoginComponent, HomePageComponent],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class HomeModule {
}
