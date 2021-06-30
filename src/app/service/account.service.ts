import { TokenStorageService } from './token-storage.service';
import { TeacherUpdateDTO } from './../dto/teacher/TeacherUpdateDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITeacherViewDTO } from '../dto/teacher/TeacherViewDTO';
import { IPasswordDTO } from '../dto/IPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private API_URL = environment.apiBaseUrl;
  username : string ;
  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorageService.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  getInfoAccount(): Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    console.log(this.username);
    return this.httpClient.get<ITeacherViewDTO>(this.API_URL + '/api/teacher/info/' + this.username,this.httpOptions);
  }
  updateInfoAccount(teacherUpdateDTO: TeacherUpdateDTO) : Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.put<TeacherUpdateDTO>(this.API_URL + '/api/teacher/update-info/'+ this.username, teacherUpdateDTO,this.httpOptions);
  }
  changePassword(passwordDTO : IPasswordDTO): Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.put<IPasswordDTO>(this.API_URL + '/api/teacher/change-password/'+ this.username, passwordDTO,this.httpOptions);
  }
  forgotPassword(code : number): Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/forgot-password/'+ this.username + '?code=' + code,this.httpOptions);
  }
}
