import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {

  
  UnitList: any =[];
  addUnitForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddUnitBtn') closeaddUnitBtn: any;
  deleteUnitItem: any;
  p = 1;
  productsFound: boolean = false;
  pageLoaded : boolean= false;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addUnitForm = this._formBuilder.group({
      unitId: [],
      unitName: ['', Validators.required],
      unitCode:[,Validators.required],
      basicUnit:[,Validators.required]
    })

   
  }

  ngOnInit(): void {
    this.getAllUnits()
  }

  get f(){ return this.addUnitForm.controls}


  getAllUnits(){
    this._adminService.getAllUnits().subscribe((data) => {
      console.log(data,'all units')
     if(data.length > 0){
      this.pageLoaded = true;
       this.UnitList = data;
      }else{
        this.UnitList = [];
        this.pageLoaded = true;
      }
      
    })
  }

  showaddUnitModal(){
  
    this.submitted = false;
    this.addUnitForm.reset();
    this.addUnitForm.markAsUntouched();
    this.addUnitForm.markAsPristine();
  
  }

 


  submitNewUnit(){
    this.submitted = true;
     if(this.addUnitForm.valid){
      //  console.log(this.addUnitForm.value)
        var addUnitData :any = {};
        addUnitData.unitId = 0;
        addUnitData.unitName = this.addUnitForm.controls['unitName'].value;
        addUnitData.unitCode = this.addUnitForm.controls['unitCode'].value;
        addUnitData.basicUnit = this.addUnitForm.controls['basicUnit'].value;
        this._adminService.addUnit(addUnitData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Unit added successfully!');
            this.closeaddUnitBtn.nativeElement.click();
            this.getAllUnits();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  

}
