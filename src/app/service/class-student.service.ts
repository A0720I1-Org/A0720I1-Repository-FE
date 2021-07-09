import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClassSearchData} from "../dto/student/ClassSearchData";

@Injectable({
  providedIn: 'root'
})
export class ClassStudentService {
  private API_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getClassesByYearAndGrade(classSearchData: ClassSearchData): Observable<any>{
    return this.httpClient.post<any>(this.API_URL + '/api/public/student/class/get-class-list-by-year-grade', classSearchData)
  }
}
