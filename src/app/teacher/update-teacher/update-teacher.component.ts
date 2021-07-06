import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Component, Inject, OnInit} from '@angular/core';
import {TeacherService} from '../../service/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TeacherUpdateDTO} from '../../dto/teacher/TeacherUpdateDTO';
import {HttpErrorResponse} from '@angular/common/http';
import {AngularFireStorage} from "@angular/fire/storage";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

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
    imageUrl: string;
  };
  studentClass: string = '';
  imageUrl: string;
  inputImage: any = null;
  private filePath: string;
  validationMessages = {
    'name': [
      {type: 'required', message: 'Tên chỉ không được để trống.'},
      {type: 'pattern', message: 'Tên không đúng định dạng.'}
    ],
    'address': [
      {type: 'required', message: 'Địa chỉ không được để trống.'},
      {type: 'pattern', message: 'Địa chỉ không đúng định dạng.'}
    ],
    'hometown': [
      {type: 'required', message: 'Quê quán không được để trống.'},
      {type: 'pattern', message: 'Quê quán không đúng định dạng.'}
    ],
    'phone': [
      {type: 'required', message: 'Phone không được để trống.'},
      {type: 'pattern', message: 'Phone không đúng định dạng.'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống.'},
      // {type: 'pattern', message: 'Email không đúng định dạng.'}
      {type: 'email', message: 'Email không đúng định dạng.'}
    ],
    'position': [
      {type: 'required', message: 'Chức vụ không được để trống.'},
      {type: 'pattern', message: 'Chức vụ không đúng định dạng.'}
    ]
  };


  constructor(
    private teacherService: TeacherService,
    private router: Router,
    private fb: FormBuilder,
    private  activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.idTeacher = this.activatedRoute.snapshot.params['id'];
    this.initFormUpdate();
    this.teacherService.getTeacherById(this.idTeacher).subscribe(data => {
      this.teacher = data;
      if (data.studentClass === null) {
        this.studentClass = 'Chưa có lớp chủ nhiệm'
      } else {
        this.studentClass = data.studentClass;
      }
      this.imageUrl = data.imageUrl;
      if (data.imageUrl === '') {
        this.imageUrl = 'https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/card-image%2Fcard-image.jpg?alt=media&token=d5f7d82f-93bd-425f-ad97-3824621d84df'
      } else {
        this.imageUrl = data.imageUrl;
      }
      this.formTeacher.patchValue(data);
    });
  }

  initFormUpdate() {
    this.formTeacher = this.fb.group({
      id: [''],
      name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)])
      ],
      address: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)])
      ],
      email: ['', Validators.compose([
        Validators.required,
        // Validators.pattern(/\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/)
        Validators.email
      ])
      ],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(09|01[2|6|8|9])+([0-9]{8})\b$/)])
      ],
      level: ['', Validators.compose([
        Validators.required])
      ],
      position: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)])
      ],
      hometown: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[^`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|\[|\{|\]|\}|\||\\|\'|\<|\,|\.|\>|\?|\/|\""|\;|\:]*$/)])
      ],
      gender: ['', Validators.compose([
        Validators.required])
      ],
      birthday: ['', Validators.compose([
        Validators.required])
      ],
      imageUrl: ['']
    });
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.formTeacher.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }

  updateTeacher() {
    if (this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formTeacher.patchValue({...this.teacher, imageUrl: url});
            this.teacherService.updateTeacher(this.formTeacher.value).subscribe(
              () => {
                this.router.navigateByUrl('/teacher').then(
                  r => this.toastrService.success(
                    "Cập nhật thông tin thành công",
                    "Thông báo",
                    {timeOut: 3000, extendedTimeOut: 1500})
                )
              },
              (error: HttpErrorResponse) => {
                console.log(error.message);
              });
          })
        })
      ).subscribe()
    } else {
      this.teacherService.updateTeacher(this.formTeacher.value).subscribe(
        () => {
          this.router.navigateByUrl('/teacher').then(
            r => this.toastrService.success(
              "Cập nhật thông tin thành công",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        });
    }
  }

  getImageUrl(){
    if(this.filePath != null){
      return this.filePath;
    }
    if(this.formTeacher.value.imageUrl != ""){
      return this.formTeacher.value.imageUrl;
    }
    return 'https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/card-image%2Fcard-image.jpg?alt=media&token=d5f7d82f-93bd-425f-ad97-3824621d84df';
  }

}
