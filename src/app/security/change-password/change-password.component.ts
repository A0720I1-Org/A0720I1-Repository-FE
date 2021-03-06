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
                "?????i m???t kh???u th??nh c??ng",
                "Th??ng b??o",
                {timeOut: 3000, extendedTimeOut: 1500})
            )
          },
          (error: HttpErrorResponse) => {
              this.toastrService.error(
                error.error,
                "Th??ng b??o",
                {timeOut: 3000, extendedTimeOut: 1500})
          }
        );
      }
    }

    validationMessage = {
      'oldPassword': [
        {type: 'required', message: 'M???t kh???u kh??ng ???????c ????? tr???ng!'},
        {type: 'minlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'maxlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'pattern', message: 'M???t kh???u kh??ng ???????c ch???a k?? t??? ?????c bi???t'}
      ],
      'newPassword': [
        {type: 'required', message: 'M???t kh???u kh??ng ???????c ????? tr???ng!'},
        {type: 'minlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'maxlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'failPassword', message: 'M???t kh???u m???i kh??ng ???????c tr??ng m???t kh???u c??'},
        {type: 'pattern', message: 'M???t kh???u kh??ng ???????c ch???a k?? t??? ?????c bi???t'}
      ],
      'confirmPassword': [
        {type: 'required', message: 'M???t kh???u kh??ng ???????c ????? tr???ng!'},
        {type: 'minlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'maxlength', message: 'M???t kh???u ch??? ch???a t??? 6 ?????n 24 k?? t???'},
        {type: 'notMatchPassword',message: 'Nh???p l???i m???t kh???u ph???i gi???ng m???t kh???u m???i'},
        {type: 'pattern', message: 'M???t kh???u kh??ng ???????c ch???a k?? t??? ?????c bi???t'}
      ]
    };

}
