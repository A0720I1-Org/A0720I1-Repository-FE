import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";
import {TeacherCreateDTO} from "../../dto/teacher/TeacherCreateDTO";
import {TeacherCreateError} from "../../dto/teacher/TeacherCreateError";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  validationMessage = {
    'username': [
      {type: 'required', message: 'Tên đăng nhập không được để trống!'},
      {type: 'minlength', message: 'Tên đăng nhập tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Tên đăng nhập tối đa 32 ký tự'},
      {type: 'pattern', message: 'Tên đăng nhập không chứa dấu ký tự đặc biệt hoặc khoảng trắng'},

    ],
    'password': [
      {type: 'required', message: 'Mật khẩu không được để trống!'},
      {type: 'minlength', message: 'Mật khẩu tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Mật khẩu tối đa 32 ký tự'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'Xác nhận mật khẩu không được để trống!'},
      {type: 'match', message: 'Xác nhận mật khẩu không trùng khớp'}
    ],
    'name': [
      {type: 'required', message: 'Họ và tên không được để trống!'},
      {type: 'maxlength', message: 'Họ và tên dài tối đa 300 ký tự'},
      {type: 'pattern', message: 'Họ và tên không chứa ký tự số hoặc ký tự đặc biệt'}
    ],
    'birthday': [
      {type: 'required', message: 'Ngày sinh không được để trống!'},
      {type: 'past', message: 'Ngày sinh phải là ngày trong quá khứ'}
    ],
    'gender': [
      {type: 'required', message: 'Giới tính không được để trống!'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    'imageUrl': [
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ]
  };
  inputImage: any = null;
  teacher: TeacherCreateDTO;
  uploading: boolean;
  errorMessage = new TeacherCreateError();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private teacherService: TeacherService,
    private toastrService: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.uploading = false;
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[A-Za-z0-9]*$/)
      ]),
      pwGroup: this.formBuilder.group({
        password: this.formBuilder.control('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(32)
        ]),
        confirmPassword: this.formBuilder.control('', [
          Validators.required
        ])
      }, {validators: passwordMatched}),
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:|0-9]*$/)
      ]),
      birthday: this.formBuilder.control('', [
        Validators.required,
        past
      ]),
      gender: this.formBuilder.control('', [
        Validators.required,
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      imageUrl: this.formBuilder.control('', [
          Validators.pattern(/[.jpg|.jpeg|.png]$/)
        ]
      )
    })
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
  }

  onSubmit() {
    if (this.inputImage != null) {
      this.uploading = true;
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {

            this.teacher = new TeacherCreateDTO(this.teacherForm.get('username').value, this.teacherForm.get('pwGroup').get('password').value,
              this.teacherForm.get('name').value, this.teacherForm.get('birthday').value, this.teacherForm.get('gender').value, this.teacherForm.get('email').value, url)
            this.teacherService.createTeacher(this.teacher).subscribe(
              (data) => {
                this.router.navigateByUrl("/teacher").then(
                  r => this.toastrService.success(
                    "Thêm mới thành công giáo viên",
                    "Thông báo",
                    {timeOut: 3000, extendedTimeOut: 1500})
                )
              },
              err => {
                this.errorMessage = err.error.errors;
                this.toastrService.error(
                  "Không thể tạo giáo viên",
                  "Có lỗi xảy ra",
                  {timeOut: 3000, extendedTimeOut: 1500}
                )
              }
            )
            this.uploading = false;
          })
        })
      ).subscribe()
    } else {
      this.teacher = new TeacherCreateDTO(this.teacherForm.get('username').value, this.teacherForm.get('pwGroup').get('password').value,
        this.teacherForm.get('name').value, this.teacherForm.get('birthday').value, this.teacherForm.get('gender').value, this.teacherForm.get('email').value, null)
      this.teacherService.createTeacher(this.teacher).subscribe(
        (data) => {
          this.teacherForm.reset();
          this.toastrService.success(
            "Thêm mới thành công giáo viên",
            "Thông báo",
            {timeOut: 3000, extendedTimeOut: 1500})
          this.ngOnInit()
        },
        err => {
          this.errorMessage = err.error.errors;
          this.toastrService.error(
            "Không thể tạo giáo viên",
            "Có lỗi xảy ra",
            {timeOut: 3000, extendedTimeOut: 1500}
          )
        }
      )
    }
  }
}

function passwordMatched(formControl: AbstractControl) {
  const pw = formControl.value;
  if (pw.password !== pw.confirmPassword) {
    return {match: true};
  }
  return null;
}

function past(formControl: AbstractControl) {
  const formValue = formControl.value;
  const birthday = new Date(formValue)
  const today = new Date();
  if (today.getTime() < birthday.getTime()) {
    return {past: true};
  }
  return null;
}
