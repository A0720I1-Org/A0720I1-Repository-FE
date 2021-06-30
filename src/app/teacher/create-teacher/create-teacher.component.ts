import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";


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
      {type: 'minlength', message: 'Xác nhận mật khẩu tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Xác nhận mật khẩu tối đa 32 ký tự'}
    ],
    'name': [
      {type: 'required', message: 'Họ tên không được để trống!'},
      {type: 'maxlength', message: 'Họ tên tối đa 300 ký tự'},
      {type: 'pattern', message: 'Họ tên không chứa ký tự đặc biệt'}
    ],
    'birthday': [
      {type: 'required', message: 'Ngày sinh không được để trống!'}
    ],
    'gender': [
      {type: 'required', message: 'Giới tính không được để trống!'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    'imageUrl': [
      {type: 'required', message: 'Hình ảnh không được để trống!'},
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ]
  };
  inputImage: any = null;

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
  }

  initForm() {
    this.teacherForm = this.formBuilder.group({
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
      confirmPassword: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      name: this.formBuilder.control('', [
        Validators.required,
        Validators.maxLength(300),
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)
      ]),
      birthday: this.formBuilder.control('', [
        Validators.required,
      ]),
      gender: this.formBuilder.control('', [
        Validators.required,
      ]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email
      ]),
      imageUrl: this.formBuilder.control('', [
        // Validators.required,
        // Validators.pattern(/[.jpg|.jpeg|.png]$/)
      ])
    })
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
  }


  onSubmit() {
    const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
    const fileRef = this.storage.ref(imageName);
    this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
      finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
              this.teacherForm.patchValue({imageUrl: url});
              this.teacherService.createTeacher(this.teacherForm.value).subscribe(
                () => {
                  this.router.navigateByUrl("/").then(
                    r => this.toastrService.success(
                      "Thêm mới thành công",
                      "Thông báo",
                      {timeOut: 3000, extendedTimeOut: 1500})
                  )
                })
          })
        })
    ).subscribe()
  }
}
