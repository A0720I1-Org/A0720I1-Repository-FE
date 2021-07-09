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
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent implements OnInit {
  yearList: ISchoolYear[] =  null;
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

  indexPagination: number = 1;
  totalPagination: number = 0;
  listStudentNoPagination: IStudentListDTO[];
  nameSearch: string;
  hometownSearch: string;
  studentClassId: number = 0;
  role: string;
  selected : boolean = false ;
  constructor(
    private studentService: StudentService,
    public dialog: MatDialog,
    private scheduleService: ScheduleService,
    private schoolYearService: SchoolYearService,
    private gradeService: GradeService,
    private classStudentService: ClassStudentService,
    private router: Router,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
  ) {

  }

  ngOnInit(): void {
    this.getYearList();
    this.getGradeList();
    this.role = this.tokenStorageService.getUser().roles[0];
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
    this.classSearchData.yearId =  selectedYear.value;
  }


  getGradeId(selectedGrade) {
    this.classSearchData.gradeId = selectedGrade.value;
  }

  getClassList() {
    this.classStudentService.getClassesByYearAndGrade(this.classSearchData).subscribe(
      (data) => {
        this.classList = data;
        console.log("classlist "+data)
      }
    )
  }

  getClassId(selectClassId) {
    this.studentClassId = selectClassId.value;
  }


  showLists() {
    if (this.classSearchData.yearId && this.classSearchData.gradeId){
      this.selected = true ;
      this.indexPagination = 1;
      this.studentService.getAllStudentByClassId(this.studentClassId, 0).subscribe((data: IStudentListDTO[]) => {
          this.listStudent = data;
          this.studentService.getListStudent(this.studentClassId).subscribe((data: IStudentListDTO[]) => {
            this.listStudentNoPagination = data;
            this.totalPagination = (Math.ceil(this.listStudentNoPagination.length / 5));
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.message)
        });
    }else {
        this.toastrService.warning(
          "Vui lòng nhập các lựa chọn",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500});
    }
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
            this.router.navigateByUrl('/student').then(
              r => this.toastrService.success(
                "Đã xóa dữ liệu học sinh",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
            this.showLists()
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
      this.studentService.getAllStudentByClassId(this.studentClassId, (this.indexPagination * 5) - 5).subscribe((data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
    }
  }

  indexPaginationChange(value: any) {
    this.indexPagination = value;
  }

  findPagination() {
    this.studentService.getAllStudentByClassId(this.studentClassId, (this.indexPagination * 5) - 5).subscribe((data: IStudentListDTO[]) => {
      this.listStudent = data;
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.studentService.getAllStudentByClassId(this.studentClassId, (this.indexPagination * 5) - 5).subscribe(
      (data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
  }

  lastPage() {
    this.indexPagination = Math.ceil(this.listStudentNoPagination.length / 5) + 1;
    this.studentService.getAllStudentByClassId(this.studentClassId, (this.indexPagination * 5) - 5).subscribe(
      (data: IStudentListDTO[]) => {
        this.listStudent = data;
      });
  }

  getSearch(index: number) {
    if (this.nameSearch === '' && this.hometownSearch === '') {
      this.studentService.getAllStudentByClassId(this.studentClassId, 0).subscribe(
        (data: IStudentListDTO[]) => {
          console.log(data);
          this.listStudent = data;
          this.router.navigateByUrl('/student').then(
            r => this.toastrService.warning(
              "Vui lòng nhập để tìm kiếm",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        });
    } else {
      this.studentService.searchStudentByNameAndHometown(index, this.nameSearch, this.hometownSearch).subscribe(
        (data: IStudentListDTO[]) => {
          if (data == null) {
            this.router.navigateByUrl('/student').then(
              r => this.toastrService.warning(
                "Không tìm thấy dữ liệu",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          } else {
            this.indexPagination = 1;
            this.listStudent = data;
            this.studentService.getListStudent(this.studentClassId).subscribe((data: IStudentListDTO[]) => {
              this.listStudentNoPagination = data;
              this.totalPagination = (Math.ceil(this.listStudentNoPagination.length / 5));
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }


}
