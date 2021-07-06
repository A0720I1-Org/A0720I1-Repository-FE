import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TeacherUpdateDTO} from '../dto/teacher/TeacherUpdateDTO';
import {TeacherCreateDTO} from '../dto/teacher/TeacherCreateDTO';
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
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
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getPageAllTeacher(index: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/public/teacher?index=' + index, this.httpOptions);
  }

  getListTeacher(): Observable<any> {
    return this.httpClient.get<any[]>(this.API_URL + '/api/public/teacher/lists', this.httpOptions);
  }

  getTeacherById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/public/teacher/find/' + id, this.httpOptions);
  }

  updateTeacher(teacherUpdateDTO: TeacherUpdateDTO): Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/api/admin/teacher/update', teacherUpdateDTO, this.httpOptions);
  }

  createTeacher(teacher: TeacherCreateDTO): Observable<any> {
    return this.httpClient.post<TeacherCreateDTO>(this.API_URL + '/api/admin/teacher/create', JSON.stringify(teacher), this.httpOptions);
  }

  getSearch(index: number, name: string, address: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/public/search?index=' + index + '&name=' + name + '&address=' + address, this.httpOptions);
  }
}
