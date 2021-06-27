import { IClassListDTO } from './../dto/subject-result/ClassListDTO';
import { ISubject } from './../models/ISubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectResultService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }
  getSubject() : Observable<ISubject[]> {
    return this.httpClient.get<ISubject[]>(this.API_URL + '/subject-result/subject');
  }
  getClassStudent() : Observable<IClassListDTO[]> {
    return this.httpClient.get<IClassListDTO[]>(this.API_URL + '/subject-result/class');
  }
}
