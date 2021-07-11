import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";
import {SchoolYearService} from "../../service/school-year.service";
import {SchoolYear} from "../../dto/schedule/SchoolYear";
import {ClassCreate} from "../../dto/student-class/ClassCreate";
import {ClassStudentService} from "../../service/class-student.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-create-class-student',
  templateUrl: './create-class-student.component.html',
  styleUrls: ['./create-class-student.component.scss']
})
export class CreateClassStudentComponent implements OnInit {
  classForm: FormGroup;
  validationMessage = {
    'schoolYear': [
      {type: 'required', message: 'Năm học không được để trống'},

    ],
    'className': [
      {type: 'required', message: 'Tên lớp không được để trống'},
      {type: 'pattern', message: 'Tên lớp không đúng định dạng (Ví dụ: 1A, 1A5, 1/1)'},
    ]
  }
  yearList: SchoolYear[] = null;
  newClass: ClassCreate;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    private schoolYearService: SchoolYearService,
    private classStudentService: ClassStudentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getYearList();
    this.initForm();
  }

  initForm(){
    this.classForm = this.formBuilder.group({
      schoolYear: this.formBuilder.control('', [
        Validators.required,
      ]),
      className: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^1[A-Z][0-9]{0,2}$|^1\/[1-9][0-9]?$/)
      ])
    })
  }


  getYearList() {
    this.schoolYearService.getAllSchoolYear().subscribe(
      (data) => {
        this.yearList = data;
      }
    )
  }

  onSubmit() {
    this.newClass = new ClassCreate(this.classForm.get('schoolYear').value, 1, this.classForm.get('className').value);
    this.classStudentService.createClass(this.newClass).subscribe(
      (data) => {
        this.toastrService.success(
          "Thêm mới lớp thành công",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500}
        )
        this.dialog.closeAll();
      },
      err => {
        this.toastrService.error(
          err.error.message,
          "Có lỗi xảy ra",
          {timeOut: 3000, extendedTimeOut: 1500}
        )
      }
    )
  }


  closeDialog() {
    this.dialog.closeAll();
  }
}
