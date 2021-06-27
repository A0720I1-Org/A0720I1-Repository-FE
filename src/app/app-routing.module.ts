import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'teacher', loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)},
  {path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule)},
  {path: 'class', loadChildren: () => import('./class-student/class-student.module').then(m => m.ClassStudentModule)},
  {path: 'schedule', loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)},
  {path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
