import { AccountService } from './../../service/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherUpdateDTO } from 'src/app/dto/teacher/TeacherUpdateDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  formUpdate: FormGroup;
  teacher: TeacherUpdateDTO;
  studentClass : string = '1/2';
  username : string ;
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
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private  activatedRoute: ActivatedRoute,
    private tokenStorageService : TokenStorageService
  ) {
    this.username = this.tokenStorageService.getUser().account.username;
   }
  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    this.initFormUpdate();
    this.accountService.getInfoAccount().subscribe(data => {
      console.log(data);
      this.teacher = data;
      // @ts-ignore
      this.formUpdate.patchValue(data);
    });
  }
  initFormUpdate() {
    this.formUpdate = this.fb.group({
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
  onUpdate() {
    this.accountService.updateInfoAccount(this.formUpdate.value).subscribe(
      () => {
        this.router.navigateByUrl('/teacher');
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }
}
