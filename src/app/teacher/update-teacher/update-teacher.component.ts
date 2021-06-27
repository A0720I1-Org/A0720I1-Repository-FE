import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherUpdateDTO} from '../../dto/teacher/TeacherUpdateDTO';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrls: ['./update-teacher.component.scss']
})
export class UpdateTeacherComponent implements OnInit {
  idTeacher = 0;
  formTeacher: FormGroup;
  teacher: TeacherUpdateDTO = new class implements TeacherUpdateDTO {
    address: string;
    birthday: string;
    email: string;
    gender: string;
    hometown: string;
    id: number;
    level: string;
    name: string;
    phone: string;
    position: string;
  };
  studentClass: string;
  validationMessages = {
    'name': [
      {type: 'required', message: 'Tên chỉ không được để trống.'},
      {type: 'pattern', message: 'Tên không đúng định dạng.'}
    ],
    'address': [
      {type: 'required', message: 'Địa chỉ không được để trống.'},
    ],
    'hometown': [
      {type: 'required', message: 'Quê quán không được để trống.'},
    ],
    'phone': [
      {type: 'required', message: 'Phone không được để trống.'},
      {type: 'pattern', message: 'Phone không đúng định dạng.'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống.'},
      {type: 'email', message: 'Email không đúng định dạng.'}
    ],
    'position': [
      {type: 'required', message: 'Chức vụ không được để trống.'},
    ]
  };

  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private fb: FormBuilder,
    private  activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.idTeacher = this.activatedRoute.snapshot.params['id'];
    this.initFormUpdate();
    this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
      this.teacher = data;
      // @ts-ignore
      this.studentClass = data.studentClass;
      this.formTeacher.patchValue(data);
    });
  }

  initFormUpdate() {
    this.formTeacher = this.fb.group({
      id: [''],
      name: ['', Validators.compose([
        Validators.required])
      ],
      address: ['', Validators.compose([
        Validators.required])
      ],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email])
      ],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})/)])
      ],
      level: ['', Validators.compose([
        Validators.required])
      ],
      position: ['', Validators.compose([
        Validators.required])
      ],
      hometown: ['', Validators.compose([
        Validators.required])
      ],
      gender: ['', Validators.compose([
        Validators.required])
      ],
      birthday: ['', Validators.compose([
        Validators.required])
      ],
    });
  }

  updateTeacher() {
    this.teacherService.updateTeacher(this.formTeacher.value).subscribe(
      () => {
        this.router.navigateByUrl('/teacher');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
