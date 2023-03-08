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
  @ViewChild('addPhoto') addPhoto!: ElementRef;
  @ViewChild('updatePhoto') updatePhoto!: ElementRef;
  @ViewChild('closeaddUnitBtn') closeaddUnitBtn: any;
  @ViewChild('closeeditUnitBtn') closeeditUnitBtn:any;
  @ViewChild('closeDeleteUnitBtn') closeDeleteUnitBtn:any;
  addcategoryFile: any;
  editCategoryFile: any;
  addUnit:boolean = false;
  editUnit:boolean = false;
  editUnitForm: FormGroup;
  deleteUnitItem: any;
  p = 1;
  productsFound: boolean = false;
  editcategoryPhotoName = "Select File"
  addcategoryPhotoName = "Select File";

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addUnitForm = this._formBuilder.group({
      unitId: [],
      unitName: ['', Validators.required],
      unitCode:[,Validators.required],
      basicUnit:[,Validators.required]
    })

    this.editUnitForm = this._formBuilder.group({
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
  get g(){ return this.editUnitForm.controls}


  getAllUnits(){
    this._adminService.getAllUnits().subscribe((data) => {
      console.log(data,'all units')
     if(data.length > 0){
    //  this.productsFound = true;
       this.UnitList = data
      }else{
        this.UnitList = [];
       // this.productsFound = false;
      }
      
    })
  }

  showaddUnitModal(){
    this.addUnit = true;
    this.editUnit = false
    this.submitted = false;
    this.addUnitForm.reset();
    this.addUnitForm.markAsUntouched();
    this.addUnitForm.markAsPristine();
    this.addcategoryPhotoName = ''
  }

  onAddFileChange(file: any) {

    this.addcategoryPhotoName = file.target.files[0].name;
    this.addcategoryFile = file.target.files[0];
    console.log(this.addcategoryFile)
   
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



  showeditUnitModal(item:any){
    console.log(item)
    this.addUnit = false;
    this.editUnit = true;
    // this.editUnitForm.patchValue({
    //   categoryId : item.categoryId,
    //   categoryName : item.categoryName,
    //  // categoryPhoto : item.categoryPhoto
    // })
    
  }

  
  onEditFileChange(file: any) {
    this.updatePhoto.nativeElement.innerText = file.target.files[0].name;
    this.editCategoryFile = file.target.files[0];
   
  }


  
  submitUpdateUnit(){
    this.submitted = true;
    console.log(this.editUnitForm.value)
   
     if(this.editUnitForm.valid){
    
       var addUnitData :any = {};
       addUnitData.unitId = 0;
       addUnitData.unitName = this.addUnitForm.controls['unitName'].value;
       addUnitData.unitCode = this.addUnitForm.controls['unitCode'].value;
       addUnitData.basicUnit = this.addUnitForm.controls['basicUnit'].value;
        this._adminService.updateUnit(addUnitData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product Category updated successfully!');
            this.closeeditUnitBtn.nativeElement.click();
            this.getAllUnits();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteUnitModal(item:any){
      this.deleteUnitItem = item.categoryId;
  }


  deleteUnit(){
      this._adminService.deleteUnit(this.deleteUnitItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this.getAllUnits();
          this.closeDeleteUnitBtn.nativeElement.click();
        }
       
      })
  }

}
