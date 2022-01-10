import { faultInterface, FaultCauseData } from './fault.form';
import { SimpleDialogComponent } from './simple-dialog/simple-dialog.component';
import { AfterViewInit, Component, VERSION, ViewChild, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DynFormComponent } from '@myndpm/dyn-forms';
import {operatorInterface, operatorData } from './simple.form';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  displayedColumns: string[] | undefined;
  gotData = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  vdisplayedColumns: string[];
  public Gtype: OperatorEntry[] = [];
  type;
  displayedColumnsAs;

  dataSource: MatTableDataSource<any>;

  constructor(private activatedRoute: ActivatedRoute ,public dialog: MatDialog, private httpClient: HttpClient){

  }
ngOnInit(): void {
  // this.GetOperatorEntryData();
  this.activatedRoute.paramMap.subscribe( (p)=>{
    this.type = p.get('type');
    if(this.type === 'operator'){
      this.generateTableData(operatorInterface, operatorData);
    }else if(this.type === 'fault-cause'){
      this.generateTableData(faultInterface,FaultCauseData)
    }
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
          rowdata: {data : data},
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


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //console.log(this.dataSource.paginator);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  generateTableData(tableInterFace,tableData ){
    this.vdisplayedColumns = [];
      console.log(tableData,'Here');
      setTimeout(() => {
        console.log(tableInterFace);
        this.displayedColumnsAs = tableInterFace ;
        for (let i = 0; i < Object.keys(tableData[0]).length; i++) {
            this.vdisplayedColumns.push(Object.keys(tableData[0])[i])
        }
        this.vdisplayedColumns.push('star');
        this.dataSource =  new MatTableDataSource( tableData);
        this.displayedColumns = this.vdisplayedColumns ;
        // console.log(this.displayedColumns.length);
          this.dataSource.paginator = this.paginator;
        (tableData.length> 0) ? (this.gotData = true) : (this.gotData = false);
        console.log(this.displayedColumns, this.displayedColumnsAs);

      }, 600);

  }

  postData(postApi, postData){
    console.log(postData, postApi);
    // this.httpClient.post(postApi, JSON.stringify(postData)).subscribe((res: any)=>{

    // })

  }
}
