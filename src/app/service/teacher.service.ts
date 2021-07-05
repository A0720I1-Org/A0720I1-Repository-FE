import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITeacherListDTO} from '../dto/teacher/TeacherListDTO';
import {ITeacherViewDTO} from '../dto/teacher/TeacherViewDTO';
import {TeacherUpdateDTO} from '../dto/teacher/TeacherUpdateDTO';
import {TeacherCreateDTO} from '../dto/teacher/TeacherCreateDTO';
import {TeacherDTO} from "../dto/schedule/TeacherDTO";
import {StudentClassDTO} from "../dto/schedule/StudentClassDTO";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private API_URL = environment.apiBaseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getPageAllTeacher(index: number): Observable<ITeacherListDTO[]> {
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher?index=' + index);
  }

  getListTeacher(): Observable<ITeacherListDTO[]> {
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher/lists');
  }

  getTeacherById(id: number): Observable<ITeacherViewDTO> {
    return this.httpClient.get<ITeacherViewDTO>(this.API_URL + '/api/teacher/find/' + id);
  }

  updateTeacher(teacherUpdateDTO: TeacherUpdateDTO): Observable<TeacherUpdateDTO> {
    return this.httpClient.put<TeacherUpdateDTO>(this.API_URL + '/api/teacher/update', teacherUpdateDTO);
  }

  createTeacher(teacher: TeacherCreateDTO): Observable<TeacherCreateDTO> {
    return this.httpClient.post<TeacherCreateDTO>(this.API_URL + '/api/admin/teacher/create', JSON.stringify(teacher), this.httpOptions);
  }

  getSearch(index: number, name: string, address: string): Observable<ITeacherListDTO[]> {
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher/search?index=' + index + '&name=' + name + '&address=' + address);
  }
  getTeacherForSubject(studentClassId: number): Observable<TeacherDTO[]> {
    return this.httpClient.get<TeacherDTO[]>(this.API_URL + '/api/public/student-class/get-teacher-for-subject?studentClassId=' + studentClassId);
  }
}
