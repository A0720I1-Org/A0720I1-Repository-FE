import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITeacherListDTO} from "../dto/teacher/TeacherListDTO";
import {ITeacherViewDTO} from "../dto/teacher/TeacherViewDTO";
import {TeacherUpdateDTO} from "../dto/teacher/TeacherUpdateDTO";
import {IStudentListDTO} from "../dto/student/StudentListDTO";
import {IStudentViewDTO} from "../dto/student/StudentViewDTO";
import {IStudentUpdateDTO} from "../dto/student/StudentUpdateDTO";
import {IStudent} from "../models/IStudent";
import {IStudentDeleteDTO} from "../dto/student/StudentDeleteDTO";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private API_URL = environment.apiBaseUrl;
  httpOptions : any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      })
      , 'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }


  getListStudent(classId: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/student/student/list-student?classId=' + classId,this.httpOptions);
  }

  getAllStudentByClassId(classId: number, index: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/student/student/lists-student?classId=' + classId + '&index=' + index,this.httpOptions);
  }

  getStudentById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/student/student/find-student/' + id,this.httpOptions);
  }

  updateStudent(studentUpdateDTO: IStudentUpdateDTO): Observable<any> {
    return this.httpClient.put<any>(this.API_URL + '/api/teacher/student/update-student', studentUpdateDTO,this.httpOptions);
  }

  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.API_URL + "/api/teacher/student/delete-student/" + id,this.httpOptions);
  }

  getStudentFullById(id: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/student/find-delete-student/' + id,this.httpOptions);
  }

  searchStudentByNameAndHometown(index: number, name: string, hometown: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/student/student/search-student?index=' + index + '&name=' + name + '&hometown=' + hometown,this.httpOptions)
  }
}
