import { ToastrService } from 'ngx-toastr';
import { StudentAverageMarkDTO } from './../../dto/subject-result/StudentAverageMarkDTO';
import { IStudentListDTO } from './../../dto/subject-result/IStudentListDTO';
import { ISubject } from './../../models/ISubject';
import { Component, OnInit } from '@angular/core';
import { IClassListDTO } from 'src/app/dto/subject-result/ClassListDTO';
import { SubjectResultService } from 'src/app/service/subject-result.service';
import { isBuffer } from 'util';

@Component({
  selector: 'app-class-result',
  templateUrl: './class-result.component.html',
  styleUrls: ['./class-result.component.scss']
})
export class ClassResultComponent implements OnInit {
  students : IStudentListDTO[];
  classId : number ;
  semesterId : number  ;
  subjects : ISubject[] ;
  semesters  = [{value : 1},
    {value : 2}];
  classStudent : IClassListDTO[];
  studentAverageMarkDTO: StudentAverageMarkDTO[];
  isLoading : boolean ;
  isSelected : boolean = false;
  loading : boolean = false;
  constructor(private subjectResultService: SubjectResultService,
    private toastrService : ToastrService) { }
  ngOnInit(): void {
    this.getClassStudent();
    this.getSubject();
  }
  getClassStudent() {
    this.subjectResultService.getClassStudent().subscribe(
      (data) => {
        this.classStudent = data ;
      },(error) => {
        console.log(error)
      }
    )
  }
  getSubject() {
    this.subjectResultService.getSubject().subscribe(
      (data) => {
        this.subjects = data ;
      },(error) => {
        console.log(error) ;
      }
    )
  }
  getStudent() {
    this.subjectResultService.getListStudent(this.classId).subscribe(
      (data) => {
        this.students = data ;
          this.getResult();
      },(error) => {
        console.log(error) ;
      }
    )
  }
  getClassId(classId) {
    this.classId = classId.value ;
  }
  getSemester(semesterId) {
    this.semesterId =semesterId.value ;
  }
  getResult() {
    this.subjectResultService.getResultByStudentId(this.classId,this.semesterId).subscribe(
      (data) => {
        this.studentAverageMarkDTO = data ;
      }
    )
  }
  showResult() {
    if(this.classId && this.semesterId) {
      this.isSelected = true ;
      this.loading = true;
      setTimeout(() => {
        this.getStudent();
        this.loading = false ;
      },1000)
    }else {
      this.toastrService.warning(
        "Vui lòng nhập các lựa chọn",
        "Cảnh báo",
        {timeOut: 3000, extendedTimeOut: 1500}
      )
    }
  }
  calculateAverage(id : number) {
    let summary : number = 0 ;
    let count = 0;
    for(let result of this.studentAverageMarkDTO) {
      if(result.studentId === id && result.averageMark != null) {
        count++ ;
        summary += result.averageMark;
      }
    }
    if(count !== 0) {
      return summary/count;
    }
    return 0;
  }
}
