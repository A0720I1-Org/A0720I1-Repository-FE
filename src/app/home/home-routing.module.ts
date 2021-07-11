import {ChangePasswordComponent} from './../security/change-password/change-password.component';
import {UpdateInfoComponent} from './../security/update-info/update-info.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ToastrModule} from "ngx-toastr";
import { AuthGuard } from '../security/auth-guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'update-info',component : UpdateInfoComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_TEACHER']
    }
  },
  {
    path: 'change-password',component : ChangePasswordComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN','ROLE_TEACHER','ROLE_STUDENT']
    }

  },
  {path: '**',component : HomePageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
