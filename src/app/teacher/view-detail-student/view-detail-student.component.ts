import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-detail-student',
  templateUrl: './view-detail-student.component.html',
  styleUrls: ['./view-detail-student.component.scss']
})
export class ViewDetailStudentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ViewDetailStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
