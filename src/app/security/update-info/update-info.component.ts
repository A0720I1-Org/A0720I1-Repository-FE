import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../../service/account.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherUpdateDTO } from 'src/app/dto/teacher/TeacherUpdateDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { formatDate } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
  formUpdate: FormGroup;
  teacher: TeacherUpdateDTO;
  studentClass : string ;
  username : string ;
  inputImage: any = null;
  filePath : string ;
  validationMessages = {
    'address': [
      {type: 'required', message: 'Địa chỉ không được để trống.'},
    ],
    'hometown': [
      {type: 'required', message: 'Quê quán không được để trống.'},
    ],
    'phone': [
      {type: 'required', message: 'Số điện thoại không được để trống.'},
      {type: 'pattern', message: 'Số điện thoại không đúng định dạng.'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống.'},
      {type: 'email', message: 'Email không đúng định dạng.'}
    ],
  };

  constructor(
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder,
    private  activatedRoute: ActivatedRoute,
    private tokenStorageService : TokenStorageService,
    private toastrService : ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
    this.username = this.tokenStorageService.getUser().account.username;
   }
  ngOnInit(): void {
    this.initFormUpdate();
    this.accountService.getInfoAccount().subscribe(data => {
      this.teacher = data;
      // @ts-ignore

      this.formUpdate.patchValue(data);
    });
  }
  initFormUpdate() {
    this.formUpdate = this.fb.group({
      id: [''],
      name: [''],
      address: ['',Validators.compose([
        Validators.required])],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email])
      ],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(09|01[2|6|8|9])+([0-9]{8})\b$/)])
      ],
      level: [''],
      position: [''],
      hometown: ['', Validators.compose([
        Validators.required])
      ],
      gender: [''],
      birthday: [''],
      imageUrl: ['']
    });
  }
  selectImage(event) {
    this.inputImage = event.target.files[0];
    this.formUpdate.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    }
    reader.readAsDataURL(this.inputImage)
  }
  onUpdate() {
    if(this.inputImage != null) {
   const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
    const fileRef = this.storage.ref(imageName);
    this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
      finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
              this.formUpdate.patchValue({...this.teacher,imageUrl: url});
              this.accountService.updateInfoAccount(this.formUpdate.value).subscribe(
                () => {
                  this.router.navigateByUrl("/").then(
                    r => this.toastrService.success(
                      "Cập nhật thành công",
                      "Thông báo",
                      {timeOut: 3000, extendedTimeOut: 1500})
                  )
                },
                (error: HttpErrorResponse) => {
                  this.router.navigateByUrl("/").then(
                    r => this.toastrService.error(
                      "Cập nhật thất bại",
                      "Thông báo",
                      {timeOut: 3000, extendedTimeOut: 1500})
                  )
                }
              );
          })
        })
    ).subscribe()
    }else {
      this.accountService.updateInfoAccount(this.formUpdate.value).subscribe(
        () => {
          this.router.navigateByUrl("/").then(
            r => this.toastrService.success(
              "Update thành công",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        },
        (error: HttpErrorResponse) => {
          this.router.navigateByUrl("/").then(
            r => this.toastrService.error(
              "Update thất bại",
              "Thông báo",
              {timeOut: 3000, extendedTimeOut: 1500})
          )
        });
    }
  }
}
