import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TeacherUpdateDTO} from "../../dto/teacher/TeacherUpdateDTO";
import {TeacherService} from "../../service/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {IStudentUpdateDTO} from "../../dto/student/StudentUpdateDTO";
import {StudentService} from "../../service/student.service";

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.scss']
})
export class UpdateStudentComponent implements OnInit {

  idStudent = 0;
  formStudent: FormGroup;
  student: IStudentUpdateDTO = new class implements IStudentUpdateDTO {
    id: number;
    name: string;
    imageUrl: string;
    birthday: string;
    gender: string;
    hometown: string;
    email: string;
    religion: string;
    ethnicity: string;
  };
  validationMessages = {
    'name': [
      {type: 'required', message: 'Tên chỉ không được để trống.'},
      {type: 'pattern', message: 'Tên không đúng định dạng.'}
    ],
    'gender': [
      {type: 'required', message: 'không được để trống.'},
    ],
    'hometown': [
      {type: 'required', message: 'Quê quán không được để trống.'},
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống.'},
      {type: 'email', message: 'Email không đúng định dạng.'}
    ],
    'religion': [
      {type: 'required', message: 'không được để trống.'},
    ],
    'ethnicity': [
      {type: 'required', message: 'không được để trống.'},
    ]
  };

  constructor(
    private studentService: StudentService,
    private router: Router,
    private fb: FormBuilder,
    private  activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.idStudent = this.activatedRoute.snapshot.params['id'];
    this.initFormUpdate();
    this.studentService.getStudentById(this.idStudent).subscribe(data => {
      this.student = data;
      // @ts-ignore
      this.formStudent.patchValue(data);
    });
  }

  initFormUpdate() {
    this.formStudent = this.fb.group({
      id: [''],
      name: ['', Validators.compose([
        Validators.required])
      ],
      imageUrl: ['', Validators.compose([
        Validators.required])
      ],

      birthday: ['', Validators.compose([
        Validators.required])
      ],
      gender: ['', Validators.compose([
        Validators.required])
      ],
      hometown: ['', Validators.compose([
        Validators.required])
      ],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email])
      ],
      religion: ['', Validators.compose([
        Validators.required])
      ],
      ethnicity: ['', Validators.compose([
        Validators.required])
      ],

    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.formStudent.value).subscribe(
      () => {
        this.router.navigateByUrl('/student');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}


