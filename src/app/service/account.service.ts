import { TokenStorageService } from './token-storage.service';
import { TeacherUpdateDTO } from './../dto/teacher/TeacherUpdateDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITeacherViewDTO } from '../dto/teacher/TeacherViewDTO';

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
    return this.httpClient.get<ITeacherViewDTO>(this.API_URL + '/api/public/info/' + this.username);
  }
  updateInfoAccount(teacherUpdateDTO: TeacherUpdateDTO) : Observable<any> {
    this.username = this.tokenStorageService.getUser().account.username;
    return this.httpClient.put<TeacherUpdateDTO>(this.API_URL + '/api/public/update-info/'+ this.username, teacherUpdateDTO);
  }
}
