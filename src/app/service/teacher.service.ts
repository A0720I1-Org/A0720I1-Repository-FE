import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ITeacherListDTO} from '../dto/teacher/TeacherListDTO';
import {ITeacherViewDTO} from '../dto/teacher/TeacherViewDTO';
import {TeacherUpdateDTO} from '../dto/teacher/TeacherUpdateDTO';
import {TeacherCreateDTO} from '../dto/teacher/TeacherCreateDTO';
import {HomeroomClassDTO} from "../dto/teacher/HomeroomClassDTO";
import {TokenStorageService} from "./token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private API_URL = environment.apiBaseUrl;

  httpOptions: any;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.tokenStorage.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  getPageAllTeacher(index: number): Observable<any[]> {
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher?index=' + index);
  }

  getListTeacher(): Observable<any> {
    return this.httpClient.get<ITeacherListDTO[]>(this.API_URL + '/api/teacher/lists');
    // cai list teacher ai cung xem duoc
    // /api/public/teacher/teacher-list (cai thanh phan thu hai trong uri la role lay duoc api, thu 3 la doi tuong
    // neu chi role teacher lay duoc thong tin teacher thi /teacher/teacher/ ok e hieeu so so roi a
    // em ve cây uri ra là thấy nó rất đẹp nếu như em theo mẫu định dạng này
    // vẽ như nào á a
    // ok a ma sua xong cai nay nữa là xong à a
  }

  getTeacherById(id: number): Observable<ITeacherViewDTO> {
    return this.httpClient.get<ITeacherViewDTO>(this.API_URL + '/api/teacher/find/' + id);
  }

  updateTeacher(teacherUpdateDTO: TeacherUpdateDTO): Observable<TeacherUpdateDTO> {
    return this.httpClient.put<TeacherUpdateDTO>(this.API_URL + '/api/teacher/update', teacherUpdateDTO);
  }

  createTeacher(teacher: TeacherCreateDTO): Observable<any> {
    return this.httpClient.post<TeacherCreateDTO>(this.API_URL + '/api/admin/teacher/create', JSON.stringify(teacher), this.httpOptions);
  }

  getSearch(index: number, name: string, address: string): Observable<any[]> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/search&index=' + index + '&name=' + name + '&address=' + address);
  }

  getStudentByClassId(username: string): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/teacher/homeroom-class/list/' + username, this.httpOptions);
  }

  getPageStudentByClassId(index: number, username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/teacher/homeroom-class/'+ username +'?index=' + index, this.httpOptions);
  }

  getSearchStudent(index: number, name: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/teacher/homeroom-class/search?index=' +index + '&name=' + name, this.httpOptions);
  }

  viewDetailStudent(id: number): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/teacher/homeroom-class/details/'+id, this.httpOptions)
  }

  getTeacherSchedule(username: string): Observable<any>{
    return this.httpClient.get<any>(this.API_URL + '/api/teacher/teacher/teacher-schedule/' + username, this.httpOptions)
  }
}
