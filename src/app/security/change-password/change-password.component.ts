import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPasswordDTO } from 'src/app/dto/IPasswordDTO';
import { AccountService } from 'src/app/service/account.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ConfirmPasswordValidator, OldNewPassword } from './validation/confirm-password';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  account :string ;
  passwordDTO : IPasswordDTO ;
  errorMessage : string ;

  constructor(private tokenStorage: TokenStorageService,
     private toastrService: ToastrService,
    private router: Router,
    private accountService : AccountService,
    private dialog : MatDialog ) { }

  ngOnInit(): void {
  }
  formChangePassword = new FormGroup(
    {
      oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern(/^[A-Za-z0-9]*$/)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24),Validators.pattern(/^[A-Za-z0-9]*$/)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24),Validators.pattern(/^[A-Za-z0-9]*$/)])
    }, {
      validators: [ConfirmPasswordValidator,OldNewPassword]
    },
  );
  formForgotPassword = new FormGroup(
    {
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(24)])
    }, {
      validators: [ConfirmPasswordValidator]
    },
  );

    changePassword() {
      if(this.formChangePassword.valid) {
        console.log(this.formChangePassword.value);
        this.passwordDTO = this.formChangePassword.value;
        this.accountService.changePassword(this.passwordDTO).subscribe(
          () => {
            this.router.navigateByUrl("/").then(
              r => this.toastrService.success(
                "Đổi mật khẩu thành công",
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          },
          (error: HttpErrorResponse) => {
              this.toastrService.error(
                error.error,
                "Thông báo",
                {timeOut: 3000, extendedTimeOut: 1500})
          }
        );
      }
    }

    validationMessage = {
      'oldPassword': [
        {type: 'required', message: 'Mật khẩu không được để trống!'},
        {type: 'minlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'maxlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'pattern', message: 'Mật khẩu không được chứa kí tự đặc biệt'}
      ],
      'newPassword': [
        {type: 'required', message: 'Mật khẩu không được để trống!'},
        {type: 'minlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'maxlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'failPassword', message: 'Mật khẩu mới không được trùng mật khẩu cũ'},
        {type: 'pattern', message: 'Mật khẩu không được chứa kí tự đặc biệt'}
      ],
      'confirmPassword': [
        {type: 'required', message: 'Mật khẩu không được để trống!'},
        {type: 'minlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'maxlength', message: 'Mật khẩu chỉ chứa từ 6 đến 24 kí tự'},
        {type: 'notMatchPassword',message: 'Nhập lại mật khẩu phải giống mật khẩu mới'},
        {type: 'pattern', message: 'Mật khẩu không được chứa kí tự đặc biệt'}
      ]
    };

}
