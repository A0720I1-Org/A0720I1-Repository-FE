import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import {ClassCreate} from "../dto/student-class/ClassCreate";

@Injectable({
  providedIn: 'root'
})
export class ClassStudentService {
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

  getClassesByYearAndGrade(yearId: number, gradeId: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/public/class/get-class-list-by-year-grade?yearId=' + yearId + '&gradeId=' + gradeId, this.httpOptions)
  }

  getClassNameByClassId(id: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/public/schedule/get-class-name-by-id/' + id)
  }

  createClass(newClass: ClassCreate): Observable<any> {
    return this.httpClient.post<ClassCreate>(this.API_URL + '/api/admin/student-class/create-class', newClass, this.httpOptions)
  }

  getStudentListByClassId(classId: number): Observable<any> {
    return this.httpClient.get(this.API_URL + '/api/public/student-class/get-student-list-by-class-id/' + classId, this.httpOptions)
  }
}
