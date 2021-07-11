import {Component, OnInit, ViewChild} from '@angular/core';
import {SchoolYear} from "../../dto/schedule/SchoolYear";
import {SchoolYearService} from "../../service/school-year.service";
import {ClassStudentService} from "../../service/class-student.service";
import {StudentClass} from "../../dto/schedule/StudentClass";
import {MatDialog} from "@angular/material/dialog";
import {CreateClassStudentComponent} from "../create-class-student/create-class-student.component";
import {ScheduleTeacher} from "../../dto/schedule/ScheduleTeacher";
import {ClassTeacher} from "../../dto/student-class/ClassTeacher";
import {ScheduleService} from "../../service/schedule.service";
import {ClassWithTeacherInfo} from "../../dto/student-class/ClassWithTeacherInfo";
import {ClassStudent} from "../../dto/student-class/ClassStudent";
import {AbstractControl, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  teacherId: number;
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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getYearList();
    this.getTeacherList();
    this.initForm()
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
        this.classList =  data;
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
    this.newStudentList.push(this.studentForm.value);
    this.studentForm.reset();
    this.modalService.dismissAll(); //dismiss the modal
  }

  selectImage($event: Event) {

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  disableButton() {
    if (this.studentClass == null) {
      return true;
    } else {
      if (this.studentClass.teacher == null){
        return true;
      }
    }
    return false
  }

  selectTeacher(teacher) {
    this.teacherId = teacher.value
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
