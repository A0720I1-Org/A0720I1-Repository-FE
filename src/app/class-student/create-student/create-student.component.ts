import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {SchoolYear} from "../../dto/schedule/SchoolYear";
import {SchoolYearService} from "../../service/school-year.service";
import {ClassStudentService} from "../../service/class-student.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassStudentComponent} from "../create-class-student/create-class-student.component";
import {ClassTeacher} from "../../dto/student-class/ClassTeacher";
import {ScheduleService} from "../../service/schedule.service";
import {ClassWithTeacherInfo} from "../../dto/student-class/ClassWithTeacherInfo";
import {ClassStudent} from "../../dto/student-class/ClassStudent";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.scss']
})
export class CreateStudentComponent implements OnInit {
  yearList: SchoolYear[] = null;
  yearId: number = 0;
  classList: ClassWithTeacherInfo[] = null;
  studentClass: ClassWithTeacherInfo = null;
  teacherList: ClassTeacher[] = [];
  className: string;
  studentList: ClassStudent[] = [];
  studentForm: FormGroup;
  newStudent: ClassStudent;
  newStudentList: ClassStudent[] = [];
  closeResult: string;
  teacherId: number = 0;
  filePath: string;
  inputImage: any = null;
  validationMessage = {
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
    'ethnicity': [
      {type: 'required', message: 'Dân tộc không được để trống!'}
    ],
    'religion': [
      {type: 'required', message: 'Tôn giáo không được để trống!'}
    ],
    'hometown': [
      {type: 'required', message: 'Quê quán không được để trống!'}
    ],
    'email': [
      {type: 'required', message: 'Email không được để trống!'},
      {type: 'email', message: 'Email không đúng định dạng'}
    ],
    'imageUrl': [
      {type: 'pattern', message: 'Chỉ chấp nhận file jpg, png, jpeg'}
    ]
  };


  constructor(
    private schoolYearService: SchoolYearService,
    private classStudentService: ClassStudentService,
    private dialog: MatDialog,
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    @Inject(AngularFireStorage) private storage: AngularFireStorage,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getYearList();
    this.getTeacherList();
    this.initForm()
    this.newStudentList = []
  }

  getYearList() {
    this.schoolYearService.getAllSchoolYear().subscribe(
      (data) => {
        this.yearList = data;
      }
    )
  }

  getYearId(selectedYear) {
    this.yearId = selectedYear.value;
    this.getClassList()
  }

  getClassList() {
    this.classStudentService.getClassesByYearAndGrade(this.yearId, 1).subscribe(
      (data) => {
        this.classList = data;
      }
    )
  }

  selectClass(selectedClass) {
    this.studentClass = selectedClass.value
  }

  getTeacherList() {
    this.scheduleService.getAllTeacher().subscribe(
      (data) => this.teacherList = data
    )
  }

  createClass() {
    this.dialog.open(CreateClassStudentComponent, {width: '50%'})
  }

  showStudentList() {
    this.classStudentService.getStudentListByClassId(this.studentClass.id).subscribe(
      (data) => this.studentList = data
    )
  }

  initForm() {
    this.studentForm = this.formBuilder.group({
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
      hometown: this.formBuilder.control('', [
        Validators.required,
      ]),
      ethnicity: this.formBuilder.control('', [
        Validators.required,
      ]),
      religion: this.formBuilder.control('', [
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

  onSubmit() {
    console.log(this.inputImage)
    if (this.inputImage != null) {
      const imageName = formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US') + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.newStudent = this.studentForm.value;
            this.newStudent.imageUrl = url;
            this.newStudentList.push(this.newStudent);
          })
        }))
    }
    this.newStudentList.push(this.studentForm.value)
    this.studentForm.reset();
    this.modalService.dismissAll(); //dismiss the modal
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.studentForm.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg'})
  }

  disableButton() {
    if (this.studentClass == null) {
      return true;
    } else {
      if (this.studentClass.teacher == null && this.teacherId == 0) {
        return true;
      }
    }
    return false
  }

  selectTeacher(teacher) {
    this.teacherId = teacher.value
    console.log(this.teacherId)
  }

  getImageUrl() {
    if (this.filePath != null) {
      return this.filePath;
    }
    if (this.studentForm.value.imageUrl != "") {
      return this.studentForm.value.imageUrl;
    }
    return 'https://firebasestorage.googleapis.com/v0/b/a0720i1.appspot.com/o/card-image%2Fcard-image.jpg?alt=media&token=d5f7d82f-93bd-425f-ad97-3824621d84df';
  }

  createStudent() {
    console.log(this.teacherId)
    this.classStudentService.createStudent(this.newStudentList, this.teacherId, this.studentClass.id).subscribe(
      (data)=>{
        this.toastrService.success(
          "Cập nhật thông tin thành công",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500})
        this.newStudentList=[];
        this.showStudentList();
      },
      error => {
        this.toastrService.error(
          "Có lỗi xảy ra",
          "Thông báo",
          {timeOut: 3000, extendedTimeOut: 1500})
      }
    )
  }
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
