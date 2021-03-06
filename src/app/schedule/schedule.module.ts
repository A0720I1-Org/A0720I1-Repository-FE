import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { UpdateScheduleComponent } from './update-schedule/update-schedule.component';
import { ShowScheduleComponent } from './show-schedule/show-schedule.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ShowScheduleClassComponent } from './show-schedule-class/show-schedule-class.component';


@NgModule({
  declarations: [UpdateScheduleComponent, ShowScheduleComponent, ShowScheduleClassComponent],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        ReactiveFormsModule
    ]
})
export class ScheduleModule { }
