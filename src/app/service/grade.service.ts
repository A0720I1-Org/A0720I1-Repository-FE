import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGrade} from "../models/IGrade";

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
  getAllGrade(): Observable<IGrade[]> {
    return this.httpClient.get<IGrade[]>(this.API_URL + '/api/pubic/grade/get-list-grade');
  }
}
