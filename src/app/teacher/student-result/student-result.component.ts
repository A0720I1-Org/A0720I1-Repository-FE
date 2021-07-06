import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { element } from 'protractor';
import { IStudentResultDTO } from './../../dto/subject-result/IStudentResultDTO';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IClassListDTO } from 'src/app/dto/subject-result/ClassListDTO';
import { ISubject } from 'src/app/models/ISubject';
import { SubjectResultService } from 'src/app/service/subject-result.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentResultDetailComponent } from '../student-result-detail/student-result-detail.component';



@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent implements OnInit {
  subjects : ISubject[] ;
  classStudent : IClassListDTO[];
  semesters  = [{value : 1},
    {value : 2}];
    multipliers  = [{value : 1},{value : 2},{value:3}];
  subjectId : number ;
  classId : number ;
  semesterId : number ;
  multiplierId : number ;
  resultForm : FormGroup ;
  studentResultList : IStudentResultDTO[] ;
  isSelected : boolean = false;
  isEnableEdit : boolean = true ;
  constructor(private subjectResultService: SubjectResultService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private toastrService : ToastrService,
    private matDialog : MatDialog) {
      this.subjectResultService.getSubject().subscribe(
        (data) => {
          this.subjects = data ;
        },(error) => {
          console.log(error) ;
        }
      )
      this.subjectResultService.getClassStudent().subscribe(
        (data) => {
          this.classStudent = data ;
        },(error) => {
          console.log(error)
        }
      )
    }
  ngOnInit(): void {
    this.resultForm = this.formBuilder.group({
			studentResults: this.formBuilder.array([
      ])
		});
  }
  get studentResults(): FormArray {
    return this.resultForm.get('studentResults') as FormArray;
 }
  getResult(subjectId : number ,classId : number ,semesterId : number,multiplierId : number) {
      if(subjectId && classId && semesterId && multiplierId) {
        this.isSelected = true ;
        this.subjectResultService.getSubjectResult(classId,semesterId,subjectId).subscribe(
          (data) => {
          this.studentResults.clear();
            if(!data) {
              this.isSelected = true ;
              return ;
            }
            this.studentResultList = data.filter((element) => element.multiplier == multiplierId ) ;
            this.studentResultList.forEach(() => {
             let fg = this.formBuilder.group({
                studentId : [''],
                name : [''] ,
                markCol1 : ['',[Validators.min(0),Validators.max(10),Validators.pattern(/^\d*\.?\d*$/)]],
                markCol2 : ['',[Validators.min(0),Validators.max(10),Validators.pattern(/^\d*\.?\d*$/)]],
                markCol3 : ['',[Validators.min(0),Validators.max(10),Validators.pattern(/^\d*\.?\d*$/)]],
                multiplier : [''],
                birthday : [''],
              }) ;
              this.studentResults.push(fg);
            });
            if(multiplierId == 3) {
              this.studentResults.controls.forEach((e) => {
                e.get("markCol2").disable();
                e.get("markCol3").disable();
              })
            }
            this.studentResults.patchValue(this.studentResultList);
          }
        )
      }else {
        this.toastrService.warning(
          "Vui lòng nhập các lựa chọn",
          "Cảnh báo",
          {timeOut: 3000, extendedTimeOut: 1500}
        )
      }
    }

  onSubmit() {
    if(this.studentResults.valid) {
      console.log(this.studentResults.value);
      this.studentResultList = this.studentResults.value ;
      this.subjectResultService.updateSubjectResult(this.semesterId,this.classId,this.subjectId,this.studentResultList).subscribe(
        (data) => {
          this.toastrService.success(
            "Thay đổi điểm thành công",
            "Thành công",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
          this.isEnableEdit = true;
        },
        (error : HttpErrorResponse) => {
          this.toastrService.error(
            error.error,
            "Lỗi",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
          this.isEnableEdit = true;
        }
      )
    }
  }
  handleViewDetail(id : number) {
    let studentResultList : IStudentResultDTO[];
    this.subjectResultService.getSubjectResult(this.classId,this.semesterId,this.subjectId).subscribe(
      (data) => {
        studentResultList = data.filter(e => e.studentId === id);
        const dialogRef = this.dialog.open(StudentResultDetailComponent, {
          width : '500px' ,
          data: {
            students : studentResultList,
            semesterId : this.semesterId ,
            subjectId : this.subjectId ,
          }
        });
      })
  };
  validationMessage = {
    'mark': [
      {type: 'min', message: 'Điểm phải từ 0 đến 10'},
      {type: 'max', message: 'Điểm phải từ 0 đến 10'},
      {type: 'pattern', message: 'Chỉ được nhập sô'},
    ],
  };
}
