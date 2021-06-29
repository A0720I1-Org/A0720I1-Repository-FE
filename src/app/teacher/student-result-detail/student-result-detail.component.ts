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
         console.log(element.markCol3)
        this.markMultiplier2.push(element.markCol1);
        this.markMultiplier2.push(element.markCol2);
        this.markMultiplier2.push(element.markCol3);
       }
       else if(element.multiplier == 3) {
        this.markMultiplier3.push(element.markCol1);
       }
    });
  }
  calculateAverage() : any {
    this.data.students.array.forEach(element => {
       if(element.markCol1 === '' || element.markCol1) {}
    });
  }
  onCancel(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
    }
}
