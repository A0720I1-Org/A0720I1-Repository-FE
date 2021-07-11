import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../service/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ShareService} from "../../service/share.service";
import {AuthService} from "../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  roles: string[] = [];
  errorMessage: string;
  validationMessage = {
    'username': [
      {type: 'required', message: 'Tên đăng nhập không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Tên đăng nhập tối đa 32 ký tự'},
      {type: 'pattern', message: 'Tên đăng nhập không chứa ký tự đặc biệt và khoảng trắng'},

    ],
    'password': [
      {type: 'required', message: 'Mật khẩu không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu dài tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu dài tối đa 32 ký tự'}
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private shareService: ShareService,
    private authService: AuthService,
    private zone: NgZone,
    private dialog: MatDialog
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[A-Za-z0-9]*$/)
      ]),
      password: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      remember: this.formBuilder.control('')
    })
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.authService.isLoggedIn = user !== null;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
  }


  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        if (this.loginForm.value.remember){
          this.tokenStorageService.saveTokenLocal(data.token);
          this.tokenStorageService.saveUserLocal(data)
        } else {
          this.tokenStorageService.saveTokenSession(data.token);
          this.tokenStorageService.saveUserSession(data)
        }
        this.authService.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.loginForm.reset();
        this.shareService.sendClickEvent();
        this.dialog.closeAll()
      },
      err => {
        this.authService.isLoggedIn = false;
        this.toastrService.error(
            "Thông tin đăng nhập không chính xác",
            "Đăng nhập thất bại",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
      }
    );
  }

  closeDialog() {
    this.dialog.closeAll()
  }
}
