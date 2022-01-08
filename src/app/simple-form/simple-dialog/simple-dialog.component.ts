import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynFormComponent } from '@myndpm/dyn-forms';
import { simpleForm,simpleForm2, simpleData } from '../simple.form';


@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.scss']
})
export class SimpleDialogComponent implements OnInit, AfterViewInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<SimpleDialogComponent>){

  }
  button;
  // dyn-form inputs
  config;
  form = new FormGroup({});
  mode = 'edit';
  ngOnInit(): void {
  console.log(this.data);

  if(this.data.dataKey.type === 'operator'){
    this.config= simpleForm;
  }else if(this.data.dataKey.type === 'fault'){
    this.config = simpleForm2;
  }
  if (this.data.dataKey.hasOwnProperty('rowdata')) {
    // console.log(simpleData, 'SIMPLE DATA');
    console.log(this.data.dataKey.rowdata);
    this.button = this.data.dataKey.button;
    setTimeout(() => {
      this.dynForm.patchValue(this.data.dataKey.rowdata) ;
    }, 0);
  //  this.data.dataKey.rowdata && this.dynForm.patchValue(this.data?.dataKey?.rowdata) ;


  }
  else {
    this.button = this.data.dataKey.button;
  }
  }

  @ViewChild(DynFormComponent, { static: true })
  dynForm!: DynFormComponent;

  ngAfterViewInit(): void {
    // logs each debounced change in the console just to demo
    // this.dynForm.valueChanges().subscribe(console.log);
  }


  loadData(): void {
    // we can load data AfterViewInit
    this.dynForm.patchValue(simpleData);
  }



  private markAsUntouched(group: FormGroup | FormArray): void {
    group.markAsUntouched();

    Object.keys(group.controls).map((field) => {
      const control = group.get(field);
      if (control instanceof FormControl) {
        control.markAsUntouched();
      } else if (control instanceof FormGroup) {
        this.markAsUntouched(control);
      }
    });
  }

  close(){
    this.dialogRef.close();

  }

}
