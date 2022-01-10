import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynFormComponent } from '@myndpm/dyn-forms';
import { faultCauseForm } from '../fault.form';
import { operatorForm } from '../simple.form';


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
    this.config= operatorForm;
  }else if(this.data.dataKey.type === 'fault-cause'){
    this.config = faultCauseForm;
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








  close(){
    this.dialogRef.close();

  }

}
