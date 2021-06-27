import { ChangePasswordComponent } from './../security/change-password/change-password.component';
import { UpdateInfoComponent } from './../security/update-info/update-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomePageComponent},
  {path: 'update-info/:username',component : UpdateInfoComponent},
  {path: 'change-password/:username',component : ChangePasswordComponent},
  {path: '**',component : HomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
