import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { ShowScheduleComponent } from './show-schedule/show-schedule.component';


@NgModule({
  declarations: [UpdateScheduleComponent, ShowScheduleComponent],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
