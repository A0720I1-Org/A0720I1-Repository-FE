
import { IStudent } from './../../models/IStudent';
import { StudentService } from './../../service/student.service';
import { ISubject } from './../../models/ISubject';
import { IMarkDTO } from './../../dto/subject-result/IMarkDTO';
import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectResultService } from 'src/app/service/subject-result.service';
import { IStudentViewDTO } from 'src/app/dto/student/StudentViewDTO';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-result',
  templateUrl: './subject-result.component.html',
  styleUrls: ['./subject-result.component.scss']
})
export class SubjectResultComponent implements OnInit {
  marks : IMarkDTO[] = [];
  subjects : ISubject[];
  studentId : number ;
  semesters =[1,2];
  semester:number  ;
  loading = false;
  isSelected = false ;
  student : IStudentViewDTO ;
  constructor(private subjectResultService: SubjectResultService,
    private toastrService : ToastrService,
    private studentService :StudentService,
    public dialogRef: MatDialogRef<SubjectResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.studentId = this.data.studentId ;
    }

  ngOnInit(): void {
    this.getSubject();
    this.getStudent();
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
    this.studentService.getStudentById(this.studentId).subscribe(
      (data) => {
        this.student = data ;
      }
    )
  }
  getSemester(semester) {
    this.semester = semester.value ;
  }
  getMarkStudent() {
    this.subjectResultService.getResultAllSubject(this.studentId,this.semester).subscribe(
      (data) => {
        this.marks = data ;
      },(error) => {
        console.log(error) ;
      }
    )
  }
  showResult() {
    if(this.semester) {
      this.isSelected = true ;
      this.loading = true;
      setTimeout(() => {
        this.getMarkStudent();
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
    for(let mark of this.marks) {
      if(mark.markCol1 && mark.subjectId === id) {
        count+=mark.multiplier;
        summary += mark.markCol1 * mark.multiplier ;
       }
       if(mark.markCol2 && mark.subjectId === id) {
         count+=mark.multiplier;
         summary += mark.markCol2 * mark.multiplier ;
        }
        if(mark.markCol3 && mark.subjectId === id) {
         count+=mark.multiplier;
         summary += mark.markCol3 * mark.multiplier ;
        }
     }
     if(count !== 0) {
       return summary/count;
     }
     return null;
    }
    onCancel() {
      this.dialogRef.close();
    }
}
