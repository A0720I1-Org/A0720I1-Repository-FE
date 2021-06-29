import { TokenStorageService } from './token-storage.service';
import { TeacherUpdateDTO } from './../dto/teacher/TeacherUpdateDTO';
import { HttpClient } from '@angular/common/http';
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
  constructor(private httpClient: HttpClient,
    private tokenStorageService : TokenStorageService) { }
  getInfoAccount(): Observable<ITeacherViewDTO> {
    this.username = this.tokenStorageService.getUser().account.username;
    console.log(this.username);
    return this.httpClient.get<ITeacherViewDTO>(this.API_URL + '/api/teacher/info/' + this.username);
  }
  updateInfoAccount(teacherUpdateDTO: TeacherUpdateDTO) : Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.put<TeacherUpdateDTO>(this.API_URL + '/api/teacher/update-info/'+ this.username, teacherUpdateDTO);
  }
  changePassword(passwordDTO : IPasswordDTO): Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.put<IPasswordDTO>(this.API_URL + '/api/teacher/change-password/'+ this.username, passwordDTO);
  }
}
