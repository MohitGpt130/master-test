import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { AfterViewInit, Component, VERSION, ViewChild, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DynFormComponent } from '@myndpm/dyn-forms';
import { simpleData, simpleForm } from './simple.form';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';

interface OperatorEntry {
  operatorEntryname: string;
  operatorEntrycode: string;
  operatorEntrydisplayName: string;
  operatorEntryorigin?: string;
  operatorEntryid?: string;
}
@Component({
  selector: 'app-simple-form',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent implements  OnInit {
  displayedColumns: string[] | undefined;// = ['position', 'name', 'weight', 'symbol'];
  gotData = false;
  vdisplayedColumns: string[] | undefined;
  public Gtype: OperatorEntry[] = [];
  type;
  // public globalKeys: any[];
  // public globalKeys: any[];
  dataSource: MatTableDataSource<OperatorEntry>;


  displayedColumnsAs = {
    operatorEntryname: { 'DN': 'Name', 'visible': false },
    operatorEntrycode: { 'DN': 'Code', 'visible': false },
    operatorEntryorigin: { 'DN': 'Origin', 'visible': true },
    operatorEntrydisplayName: { 'DN': 'Display Name', 'visible': false },
    operatorEntryid: { 'DN': 'Operator ID', 'visible': true }
  }

  constructor(private activatedRoute: ActivatedRoute ,public dialog: MatDialog, private httpClient: HttpClient){

  }
ngOnInit(): void {
  this.GetOperatorEntryData();
  this.activatedRoute.paramMap.subscribe((p)=>{
    this.type = p.get('type');
  })
}




  OpenDailogAdd(DialogType?) {
    console.log('add entry');
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '500px',
      height: '400px'
      ,
      data: {
        dataKey: {
          title: 'Add Details',
          button: 'Submit',
          type:DialogType
        }
      }
    });
    console.log();
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {

      }
    });
  }

  DailogUpdate(data: any){
    console.log(data);
    const dialogRef = this.dialog.open(SimpleDialogComponent, {
      width: '500px',
      height: '400px'
      ,
      data: {
        dataKey: {
          rowdata: {operator : data},
          title: 'Update Details',
          button: 'Update',
          type: this.type
        }
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined) {

      }

    });
  }

  GetOperatorEntryData() {
    console.log("LineID:Testing");
    this.Gtype = [];
    console.log(this.Gtype);
    this.httpClient.get('https://capl91gn.smartfactoryworx.tech/api/manual/getoperator?origin=all').subscribe((OperatorEntrydata: any) => {
        console.log(OperatorEntrydata);
        console.log('first for');
        //this.manualentryservice.GetSubstituteData(LineID, 'machinestate', apiConfigs.restAPI.host).subscribe((OperatorEntrydata: any[]) => {
        for (let i = 0; i < OperatorEntrydata.length; i++) {
          const c = OperatorEntrydata[i];
          const cause_data =
          {
            operatorEntryname: c.operator_name,
            operatorEntrycode: c.code,
            operatorEntrydisplayName: c.display_name ? c.display_name : "",
            operatorEntryorigin: c.origin,
            operatorEntryid: c._id
          }
          this.Gtype.push(cause_data);
        }
        this.vdisplayedColumns = [];
        if (Object.keys(OperatorEntrydata).length > 0) {
          for (let i = 0; i < Object.keys(this.Gtype[0]).length; i++) {
            this.vdisplayedColumns.push(Object.keys(this.Gtype[0])[i]);
          }
          this.vdisplayedColumns.push('star');
          this.gotData = true;
          this.dataSource = new MatTableDataSource(this.Gtype);
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;

          this.displayedColumns = this.vdisplayedColumns;
        }
        else {
          console.log('else part called');
          this.gotData = true;
          // this.dataSource = null;
          this.displayedColumns = this.vdisplayedColumns;
        }
    });
  }



}
