import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITeacherListDTO} from "../dto/teacher/TeacherListDTO";
import {ITeacherViewDTO} from "../dto/teacher/TeacherViewDTO";
import {TeacherUpdateDTO} from "../dto/teacher/TeacherUpdateDTO";
import {IStudentListDTO} from "../dto/student/StudentListDTO";
import {IStudentViewDTO} from "../dto/student/StudentViewDTO";
import {IStudentUpdateDTO} from "../dto/student/StudentUpdateDTO";
import {IStudent} from "../models/IStudent";
import {IStudentDeleteDTO} from "../dto/student/StudentDeleteDTO";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private API_URL = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {
  }
  // constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ` + this.tokenStorage.getToken()
  //     })
  //     , 'Access-Control-Allow-Origin': 'http://localhost:4200',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  //   };
  // }

  getPageAllStudent(index: number): Observable<IStudentListDTO[]> {
    return this.httpClient.get<IStudentListDTO[]>(this.API_URL + '/api/student?index=' + index);
  }

  getListStudent(): Observable<IStudentListDTO[]> {
    return this.httpClient.get<IStudentListDTO[]>(this.API_URL + '/api/student/list');
  }

  getStudentById(id: number): Observable<IStudentViewDTO> {
    return this.httpClient.get<IStudentViewDTO>(this.API_URL + '/api/student/find/' + id);
  }

  updateStudent(studentUpdateDTO : IStudentUpdateDTO): Observable<IStudentUpdateDTO> {
    return this.httpClient.put<IStudentUpdateDTO>(this.API_URL + '/api/student/update', studentUpdateDTO);
  }

  deleteStudent(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.API_URL + "/api/student/delete/" + id);
  }

  getStudentFullById(id: number): Observable<IStudentDeleteDTO> {
    return this.httpClient.get<IStudentDeleteDTO>(this.API_URL + '/api/student/findDelete/' + id);
  }
}
