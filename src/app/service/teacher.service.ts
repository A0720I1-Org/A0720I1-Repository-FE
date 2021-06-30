import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITeacherListDTO} from '../dto/teacher/TeacherListDTO';
import {ITeacherViewDTO} from '../dto/teacher/TeacherViewDTO';
import {TeacherUpdateDTO} from '../dto/teacher/TeacherUpdateDTO';
import {TeacherCreateDTO} from '../dto/teacher/TeacherCreateDTO';
import {HomeroomClassDTO} from "../dto/teacher/HomeroomClassDTO";

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
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher/search&index=' + index + '&name=' + name + '&address=' + address);
  }

  getStudentByClassId(username: string): Observable<HomeroomClassDTO[]>{
    return this.httpClient.get<HomeroomClassDTO[]>(this.API_URL + '/api/teacher/homeroom-class/list/' + username);
  }

  getPageStudentByClassId(index: number, username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/homeroom-class/'+ username +'?index=' + index);
  }

  getSearchStudent(index: number, name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/homeroom-class/search?index=' +index + '&name=' + name);
  }

  viewDetailStudent(id: number){
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/homeroom-class/details/'+id)
  }
}
