import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ISchoolYear} from "../models/ISchoolYear";


@Injectable({
  providedIn: 'root'
})
export class SchoolYearService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
  getAllSchoolYear(): Observable<ISchoolYear[]> {
    return this.httpClient.get<ISchoolYear[]>(this.API_URL + '/api/pubic/school-year/get-list-school-year');
  }
}
