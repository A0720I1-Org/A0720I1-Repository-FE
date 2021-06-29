import { IStudentResultDTO } from './../dto/subject-result/IStudentResultDTO';
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
  updateSubjectResult(claStuId,seReId,subId,studentResult : IStudentResultDTO[]) : Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/subject-result/subject-result?seReId='+ seReId + '&claStuId='+claStuId+'&subId='+subId,studentResult);
  };
  getSubject() : Observable<ISubject[]> {
    return this.httpClient.get<ISubject[]>(this.API_URL + '/subject-result/subject');
  }
  getClassStudent() : Observable<IClassListDTO[]> {
    return this.httpClient.get<IClassListDTO[]>(this.API_URL + '/subject-result/class');
  };
  getSubjectResult(claStuId,seReId,subId) : Observable<IStudentResultDTO[]> {
    return this.httpClient.get<IStudentResultDTO[]>(this.API_URL + '/subject-result?seReId='+ seReId + '&claStuId='+claStuId+'&subId='+subId);
  };
}
