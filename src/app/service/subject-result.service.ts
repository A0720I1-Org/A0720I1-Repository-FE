import { IStudent } from './../models/IStudent';
import { IStudentResultDTO } from './../dto/subject-result/IStudentResultDTO';
import { IClassListDTO } from './../dto/subject-result/ClassListDTO';
import { ISubject } from './../models/ISubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectResultService {
  private API_URL = environment.apiBaseUrl;
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private tokenStorage: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  updateSubjectResult(claStuId,seReId,subId,studentResult : IStudentResultDTO[]) : Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/api/teacher/subject-result/subject-result?seReId='+ seReId + '&claStuId='+claStuId+'&subId='+subId,studentResult,this.httpOptions);
  };
  getSubject() : Observable<any> {
    return this.httpClient.get<ISubject[]>(this.API_URL + '/api/teacher/subject-result/subject',this.httpOptions);
  }
  getClassStudent() : Observable<any> {
    return this.httpClient.get<IClassListDTO[]>(this.API_URL + '/api/teacher/subject-result/class',this.httpOptions);
  };
  getSubjectResult(claStuId,seReId,subId) : Observable<any> {
    return this.httpClient.get<IStudentResultDTO[]>(this.API_URL + '/api/teacher/subject-result?seReId='+ seReId + '&claStuId='+claStuId+'&subId='+subId,this.httpOptions);
  };
  getResultByStudentId(claStuId,seReId) : Observable<any> {
    return this.httpClient.get<IStudentResultDTO[]>(this.API_URL + '/api/teacher/subject-result/average?seReId='+ seReId + '&claStuId='+claStuId,this.httpOptions);
  }
  getListStudent(claStuId) : Observable<any> {
    return this.httpClient.get<IStudent>(this.API_URL + '/api/teacher/subject-result/student?claStuId='+claStuId,this.httpOptions);
  }
}
