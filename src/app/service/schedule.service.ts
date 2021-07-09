import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Lesson} from "../dto/schedule/Lesson";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private API_URL = environment.apiBaseUrl;
  httpOptions : any

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getScheduleByClassId(classId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/api/public/schedule/show-schedule/' + classId, this.httpOptions)
  }

  getTeacherSubjectByClassId(classId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/api/public/schedule/subject-teacher-list/' + classId, this.httpOptions);
  }

  getAllSubject(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/api/public/schedule/subject-list', this.httpOptions)
  }

  getAllTeacher(): Observable<any> {
    return this.httpClient.get(this.API_URL + '/api/public/schedule/get-teacher-list', this.httpOptions)
  }

  saveSchedule(classId: number, lessonList: Lesson[]): Observable<any> {
    return this.httpClient.post(this.API_URL + '/api/admin/schedule/update-schedule/' + classId, lessonList, this.httpOptions);
  }
}
