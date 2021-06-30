import {Component, OnInit} from '@angular/core';
import {IStudentListDTO} from "../../dto/student/StudentListDTO";
import {IStudentViewDTO} from "../../dto/student/StudentViewDTO";
import {StudentService} from "../../service/student.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";
import {ViewStudentComponent} from "../view-student/view-student.component";
import {ClassSearchData} from "../../dto/student/ClassSearchData";
import {ISchoolYear} from "../../models/ISchoolYear";
import {IGrade} from "../../models/IGrade";
import {IStudentClass} from "../../models/IStudentClass";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ScheduleService} from "../../service/schedule.service";
import {SchoolYearService} from "../../service/school-year.service";
import {GradeService} from "../../service/grade.service";
import {ClassStudentService} from "../../service/class-student.service";
import {IStudent} from "../../models/IStudent";
import {IStudentDeleteDTO} from "../../dto/student/StudentDeleteDTO";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {ITeacherListDTO} from "../../dto/teacher/TeacherListDTO";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  yearList: ISchoolYear[] = null;
  gradeList: IGrade[] = null;
  classList: IStudentClass[] = null;
  classSearchData = new ClassSearchData();

  listStudent: IStudentListDTO[];
  student: IStudentViewDTO;
  selectedStudent: IStudentDeleteDTO = {
    id: 0,
    name: '',
    imageUrl: '',
    birthday: '',
    gender: '',
    hometown: '',
    email: '',
    religion: '',
    ethnicity: ''
  };

indexPagination : number =1;
totalPagination : number =0;
listStudentNoPagination: IStudentListDTO[];
  constructor(
    private studentService: StudentService,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService
  ) {
  }

  ngOnInit(): void {
    this.getYearList();
    this.getGradeList();
    this.getAllStudent();
  }

  getYearList() {
    this.schoolYearService.getAllSchoolYear().subscribe(
      (data) => {
        this.yearList = data;
      }
    )
  }

  getGradeList() {
    this.gradeService.getAllGrades().subscribe(
      (data) => {
        this.gradeList = data;
      }
    )
  }

  getYearId(selectedYear) {
    this.classSearchData.yearId = selectedYear.value;
  }


  getGradeId(selectedGrade) {
    this.classSearchData.gradeId = selectedGrade.value;
  }

  getClassList() {
    this.classStudentService.getClassesByYearAndGrade(this.classSearchData).subscribe(
      (data) => {
        this.classList = data;
      }
    )
  }


  getAllStudent() {
    this.studentService.getPageAllStudent(0).subscribe(
      (data: IStudentListDTO[]) => {
        console.log(data);
        this.listStudent = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
    this.studentService.getListStudent().subscribe((data:IStudentListDTO[]) =>{
      this.listStudentNoPagination = data;
      if((this.listStudentNoPagination.length % 5) !=0){
        this.totalPagination =(Math.round(this.listStudentNoPagination.length /5)) +1;
      }else {
        this.totalPagination= this.listStudentNoPagination.length /5
      }
    });
  }


  getViewStudent(id: number) {
    this.studentService.getStudentById(id).subscribe(
      (data: IStudentViewDTO) => {
        this.student = data;
        const dialogRef = this.dialog.open(ViewStudentComponent, {
          width: '500px',
          data: {student: this.student}
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }



  selectStudent(id: number) {
    this.studentService.getStudentFullById(id).subscribe(data => {
      this.selectedStudent = data;
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '300px',
        data: {student: this.selectedStudent}
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.studentService.deleteStudent(id).subscribe(() => {
              this.ngOnInit();
            });
        }
      });
    });
  }

  firstPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }
  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
    } else {
      this.studentService.getPageAllStudent((this.indexPagination * 5) - 5).subscribe((data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
    }
  }

  indexPaginationChange(value: any) {
    this.indexPagination = value;
  }

  findPagination() {
    this.studentService.getPageAllStudent((this.indexPagination * 5) - 5).subscribe((data: IStudentListDTO[]) => {
      this.listStudent = data;
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.studentService.getPageAllStudent((this.indexPagination * 5) - 5).subscribe(
      (data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
  }

  lastPage() {
    this.indexPagination = this.listStudentNoPagination.length / 5;
    this.studentService.getPageAllStudent((this.indexPagination * 5) - 5).subscribe(
      (data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
  }

}
