import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {StudentClassDTO} from "../dto/schedule/StudentClassDTO";

@Injectable({
  providedIn: 'root'
})
export class ClassStudentService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
  getClassStudent(gradeId: number, schoolYear: number): Observable<StudentClassDTO[]> {
    return this.httpClient.get<StudentClassDTO[]>(this.API_URL + '/api/public/student-class/get-list-student-class?gradeId=' + gradeId + '&schoolYearId=' + schoolYear);
  }
}
