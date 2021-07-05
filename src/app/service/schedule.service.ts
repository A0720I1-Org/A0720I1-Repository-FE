import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LessonDTO} from "../dto/schedule/LessonDTO";
@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
  getSchedule(studentClassId: number): Observable<LessonDTO[]> {
    return this.httpClient.get<LessonDTO[]>(this.API_URL + '/api/pubic/schedule/get-schedule?studentClassId=' + studentClassId);
  }
}
