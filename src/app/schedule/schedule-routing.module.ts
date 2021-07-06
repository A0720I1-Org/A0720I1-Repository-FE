import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowScheduleComponent} from "./show-schedule/show-schedule.component";
import {UpdateScheduleComponent} from "./update-schedule/update-schedule.component";
import {AuthGuard} from "../security/auth-guard";
import {ShowScheduleClassComponent} from "./show-schedule-class/show-schedule-class.component";


const routes: Routes = [
  {path: '', component: ShowScheduleComponent},
  {path: 'update/:id', component: UpdateScheduleComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},
  {path: ':id', component: ShowScheduleClassComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
