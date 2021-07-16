import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private API_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) {
  }

  getAllGrades(): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/public/student/grade/get-grade-list')
  }
}
