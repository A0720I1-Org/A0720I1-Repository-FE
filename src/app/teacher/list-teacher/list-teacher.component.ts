import {Component, OnInit} from '@angular/core';
import {ITeacherListDTO} from '../../dto/teacher/TeacherListDTO';
import {HttpErrorResponse} from '@angular/common/http';
import {TeacherService} from '../../service/teacher.service';
import {ITeacherViewDTO} from '../../dto/teacher/TeacherViewDTO';
import {MatDialog} from '@angular/material/dialog';
import {ViewTeacherComponent} from '../view-teacher/view-teacher.component';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";


@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.scss']
})
export class ListTeacherComponent implements OnInit {
  indexPagination: number = 1;
  totalPagination: number;
  listTeacher: ITeacherListDTO[];
  listTeacherNoPagination: ITeacherListDTO[];
  teacher: ITeacherViewDTO;
  nameSearch: string = '';
  addressSearch: string = '';
  role: string = '';

  constructor(
    private teacherService: TeacherService,
    public dialog: MatDialog,
    private router: Router,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.getAllTeacher();
    if (this.tokenStorageService.getUser() !== null) {
      this.role = this.tokenStorageService.getUser().roles[0];
    }
  }

  getAllTeacher() {
    this.teacherService.getPageAllTeacher(0).subscribe(
      (data: ITeacherListDTO[]) => {
        if (data == null) {
          this.router.navigateByUrl('/teacher').then(
            r => this.toastrService.warning(
              "Không tìm thấy dữ liệu",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        } else {
          this.listTeacher = data;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
    this.teacherService.getListTeacher().subscribe((data: ITeacherListDTO[]) => {
      this.listTeacherNoPagination = data;
      if ((this.listTeacherNoPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listTeacherNoPagination.length / 5)) + 1;
      } else {
        this.totalPagination = this.listTeacherNoPagination.length / 5;
      }
    });
  }

  viewDetailTeacher(id: number) {
    this.teacherService.getTeacherById(id).subscribe(
      (data: ITeacherViewDTO) => {
        this.teacher = data;
        const dialogRef = this.dialog.open(ViewTeacherComponent, {
          width: '500px',
          data: {teacher: this.teacher}
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngOnInit();
        });
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
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
      this.teacherService.getPageAllTeacher((this.indexPagination * 5) - 5).subscribe((data: ITeacherListDTO[]) => {
        this.listTeacher = data;
      });
    }
  }

  indexPaginationChange(value: any) {
    this.indexPagination = value;
  }

  findPagination() {
    this.teacherService.getPageAllTeacher((this.indexPagination * 5) - 5).subscribe((data: ITeacherListDTO[]) => {
      this.listTeacher = data;
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.teacherService.getPageAllTeacher((this.indexPagination * 5) - 5).subscribe(
      (data: ITeacherListDTO[]) => {
        this.listTeacher = data;
      });
  }

  lastPage() {
    this.indexPagination = Math.round(this.listTeacherNoPagination.length / 5) + 1;
    this.teacherService.getPageAllTeacher((this.indexPagination * 5) - 5).subscribe(
      (data: ITeacherListDTO[]) => {
        this.listTeacher = data;
      });
  }

  getSearch(index: number) {
    if (this.nameSearch === '' && this.addressSearch === '') {
      this.teacherService.getPageAllTeacher(0).subscribe(
        (data) => {
          this.listTeacher = data;
          this.router.navigateByUrl('/teacher').then(
            r => this.toastrService.warning(
              "Vui lòng nhập để tìm kiếm",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        });
    } else {
      this.teacherService.getSearch(index, this.nameSearch, this.addressSearch).subscribe(
        (data: ITeacherListDTO[]) => {
          if (data == null) {
            this.router.navigateByUrl('/teacher').then(
              r => this.toastrService.warning(
                "Không tìm thấy dữ liệu",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          } else {
            this.listTeacher = data;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }
}
