import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {

  private API_URL = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getAllSchoolYear(): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/public/student/school-year/get-school-year-list')
  }
}
