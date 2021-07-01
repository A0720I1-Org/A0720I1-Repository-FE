import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../service/teacher.service";
import {HomeroomClassDTO} from "../../dto/teacher/HomeroomClassDTO";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenStorageService} from "../../service/token-storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ViewDetailStudentComponent} from "../view-detail-student/view-detail-student.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-list-homeroom-class',
  templateUrl: './list-homeroom-class.component.html',
  styleUrls: ['./list-homeroom-class.component.scss']
})
export class ListHomeroomClassComponent implements OnInit {
  listStudentClass: HomeroomClassDTO[] = null;
  listStudentClassNoPagination: HomeroomClassDTO[];
  student: HomeroomClassDTO;
  username: string;
  nameSearch: string = '';
  indexPagination: number = 1;
  totalPagination: number;

  constructor(
    private teacherService: TeacherService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastrService: ToastrService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().account.username;
    this.getStudentByClassId();
  }

  getStudentByClassId() {
    this.teacherService.getPageStudentByClassId(0, this.username).subscribe(
      (data: HomeroomClassDTO[]) => {
        this.listStudentClass = data;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
    this.teacherService.getStudentByClassId(this.username).subscribe((data: HomeroomClassDTO[]) => {
      this.listStudentClassNoPagination = data;
      if ((this.listStudentClassNoPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listStudentClassNoPagination.length / 5)) + 1;
      } else {
        this.totalPagination = this.listStudentClassNoPagination.length / 5;
      }
    });
  }

  viewDetailStudent(id: number){
    this.teacherService.viewDetailStudent(id).subscribe(
      (data: HomeroomClassDTO) => {
        this.student = data;
        const dialogRef = this.dialog.open(ViewDetailStudentComponent, {
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

  getSearch(index: number) {
    if (this.nameSearch === '') {
      this.teacherService.getStudentByClassId(this.username).subscribe(
        (data) => {
          this.listStudentClass = data;
          this.router.navigateByUrl('/teacher/homeroom-class').then(
            r => this.toastrService.warning(
              "Vui lòng nhập để tìm kiếm",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        });
    } else {
      this.teacherService.getSearchStudent(index,this.nameSearch).subscribe(
        (data: HomeroomClassDTO[]) => {
          if (data == null) {
            this.router.navigateByUrl('/teacher/homeroom-class').then(
              r => this.toastrService.warning(
                "Không tìm thấy dữ liệu",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          } else {
            this.listStudentClass = data;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
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
      this.teacherService.getPageStudentByClassId((this.indexPagination * 5) - 5, this.username).subscribe((data: HomeroomClassDTO[]) => {
        this.listStudentClass = data;
      });
    }
  }

  indexPaginationChange(value: any) {
    this.indexPagination = value;
  }

  findPagination() {
    this.teacherService.getPageStudentByClassId((this.indexPagination * 5) - 5, this.username).subscribe((data: HomeroomClassDTO[]) => {
      this.listStudentClass = data;
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.teacherService.getPageStudentByClassId((this.indexPagination * 5) - 5, this.username).subscribe(
      (data: HomeroomClassDTO[]) => {
        this.listStudentClass = data;
      });
  }

  lastPage() {
    this.indexPagination = this.listStudentClassNoPagination.length / 5;
    this.teacherService.getPageStudentByClassId((this.indexPagination * 5) - 5, this.username).subscribe(
      (data: HomeroomClassDTO[]) => {
        this.listStudentClass = data;
      });
  }
}
