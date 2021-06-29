import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {TeacherService} from "../../service/teacher.service";
import {ToastrService} from "ngx-toastr";
import {TeacherCreateDTO} from "../../dto/teacher/TeacherCreateDTO";

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss']
})
export class CreateTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  validationMessage = {
    'username': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'minlength', message: 'Tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Tối đa 32 ký tự'},
      {type: 'pattern', message: 'Không chứa dấu ký tự đặc biệt hoặc khoảng trắng'},

    ],
    'password': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'minlength', message: 'Tối thiểu 4 ký tự'},
      {type: 'maxlength', message: 'Tối đa 32 ký tự'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'match', message: 'Mật khẩu không trùng khớp'}
    ],
    'name': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'maxlength', message: 'Tối đa 300 ký tự'},
      {type: 'pattern', message: 'Không chứa ký tự đặc biệt'}
    ],
    'birthday': [
      {type: 'required', message: 'Không được để trống!'}
    ],
    'gender': [
      {type: 'required', message: 'Không được để trống!'}
    ],
    'email': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'email', message: 'Không đúng định dạng'}
    ],
    'imageUrl': [
      {type: 'required', message: 'Không được để trống!'},
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ]
  };
  inputImage: any = null;
  teacher: TeacherCreateDTO
  errorMessage: string;

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
          Validators.required,
          Validators.pattern(/[.jpg|.jpeg|.png]$/)
        ]
      )
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
          this.teacher = new TeacherCreateDTO(this.teacherForm.get('username').value, this.teacherForm.get('pwGroup').get('password').value,
            this.teacherForm.get('name').value, this.teacherForm.get('birthday').value, this.teacherForm.get('gender').value,this.teacherForm.get('email').value, url)
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
              this.toastrService.error(
                err.error.errors[0],
                "Có lỗi xảy ra",
                {timeOut: 3000, extendedTimeOut: 1500}
              )
            }
          )
        })
      })
    ).subscribe()
  }
}
function passwordMatched(formControl: AbstractControl) {
  const pw = formControl.value;
  if (pw.password !== pw.confirmPassword) {
    return {match: true};
  }
  return null;
}
