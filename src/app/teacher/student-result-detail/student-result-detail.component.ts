import { element } from 'protractor';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-student-result-detail',
  templateUrl: './student-result-detail.component.html',
  styleUrls: ['./student-result-detail.component.scss']
})
export class StudentResultDetailComponent implements OnInit {
  averageMark : number ;
  markMultiplier1:number[] = [] ;
  markMultiplier2:number[] = [] ;
  markMultiplier3:number[] = [];
  count : number = 0 ;
  sum : number = 0 ;
  constructor(public dialogRef: MatDialogRef<StudentResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.data.students.forEach(element => {
       if(element.multiplier == 1) {
        this.markMultiplier1.push(element.markCol1);
        this.markMultiplier1.push(element.markCol2);
        this.markMultiplier1.push(element.markCol3);
       }
       else if(element.multiplier == 2) {
        this.markMultiplier2.push(element.markCol1);
        this.markMultiplier2.push(element.markCol2);
        this.markMultiplier2.push(element.markCol3);
       }
       else if(element.multiplier == 3) {
        this.markMultiplier3.push(element.markCol1);
       }
    });
    this.calculateAverage();
  }
  calculateAverage() : any {
    this.data.students.forEach(element => {
      if(element.markCol1 != ''  &&   element.markCol1) {
        this.count+=element.multiplier;
        this.sum += parseFloat(element.markCol1) * element.multiplier ;
      }
      if (element.markCol2 != '' && element.markCol2) {
        this.count+=element.multiplier;
        this.sum += parseFloat(element.markCol2) * element.multiplier ;
      }
      if(element.markCol3 != '' && element.markCol3) {
        this.count+=element.multiplier;
        this.sum += parseFloat(element.markCol3) * element.multiplier ;
      }
    });
    console.log(this.sum);
    if(this.count == 0 ) return ;
    else this.averageMark = this.sum/this.count ;
  }
  onCancel(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
    }
}
