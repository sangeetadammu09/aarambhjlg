import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.css']
})
export class CenterComponent implements OnInit {

  CenterList: any =[];
  addCenterForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddCenterBtn') closeaddCenterBtn: any;
  @ViewChild('closeeditCenterBtn') closeeditCenterBtn:any;
  @ViewChild('closeDeleteCenterBtn') closeDeleteCenterBtn:any;
  addCenter:boolean = false;
  editCenter:boolean = false;
  editCenterForm: FormGroup;
  deleteCenterItem: any;
  p = 1;
  productsFound: boolean = false;
  cityId = localStorage.getItem('userCity');
  cityList: any;
  salesOfficerList: any;
  relationOfficerList: any;
  salesManagerList: any;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addCenterForm = this._formBuilder.group({
      centerName: ['', Validators.required],
      centerNo: ['', Validators.required],
      centerAddress: ['', Validators.required],
      cityId: [, Validators.required],
      soId: [, Validators.required],
      roId: [, Validators.required],
      smId: [, Validators.required],
      createdBy: [, Validators.required],
      createdDate: []
     
    })

    this.editCenterForm = this._formBuilder.group({
      centerName: ['', Validators.required],
      centerNo: ['', Validators.required],
      centerAddress: ['', Validators.required],
      cityId: [, Validators.required],
      soId: [, Validators.required],
      roId: [, Validators.required],
      smId: [, Validators.required],
      createdBy: [, Validators.required],
      createdDate: []
    })
  }

  ngOnInit(): void {
    this.getAllCenters();
    this.getAllCitys();
    this.getAllRelationOfficerByCity();
    this.getAllSalesManagersByCity();
    this.getAllSalesOfficerByCity();
  }

  get f(){ return this.addCenterForm.controls}
  get g(){ return this.editCenterForm.controls}


  getAllCenters(){
    this._adminService.getAllCenter(this.cityId).subscribe((data) => {
      console.log(data,'all Centers')
     if(data.length > 0){
    //  this.productsFound = true;
       this.CenterList = data;
      }else{
        this.CenterList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
     console.log(data,'all Citys')
     if(data.length > 0){
  
       this.cityList = data;
      }else{
        this.cityList = [];
      }
      
    })
  }

  getAllSalesOfficerByCity(){
    this._adminService.getAllSalesOfficerByCity(this.cityId).subscribe((data) => {
   console.log(data,'all getAllSalesOfficerByCity')
     if(data.length > 0){
  
       this.salesOfficerList = data;
      }else{
        this.salesOfficerList = [];
      }
      
    })
  }

  getAllRelationOfficerByCity(){
    this._adminService.getAllRelationOfficerByCity(this.cityId).subscribe((data) => {
     console.log(data,'all getAllRelationOfficerByCity')
     if(data.length > 0){
  
       this.relationOfficerList = data;
      }else{
        this.relationOfficerList = [];
      }
      
    })
  }

  getAllSalesManagersByCity(){
    this._adminService.getAllSalesManagersByCity(this.cityId).subscribe((data) => {
    console.log(data,'all getAllSalesManagersByCity')
     if(data.length > 0){
  
       this.salesManagerList = data;
      }else{
        this.salesManagerList = [];
      }
      
    })
  }

  showaddCenterModal(){
    this.addCenter = true;
    this.editCenter = false
    this.submitted = false;
    this.addCenterForm.reset();
    this.addCenterForm.markAsUntouched();
    this.addCenterForm.markAsPristine();
    this.addCenterForm.controls['cityId'].setValue('');
    this.addCenterForm.controls['soId'].setValue('');
    this.addCenterForm.controls['roId'].setValue('');
    this.addCenterForm.controls['smId'].setValue('');
    
  }

  submitNewCenter(){
    this.submitted = true;
     if(this.addCenterForm.valid){
      //  console.log(this.addCenterForm.value)
        var addCenterData :any = {};
        addCenterData.CenterId = 0;
        addCenterData.CenterName = this.addCenterForm.controls['CenterName'].value;
        addCenterData.registrationFees = this.addCenterForm.controls['registrationFees'].value;
       
        this._adminService.addCenter(addCenterData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Center added successfully!');
            this.closeaddCenterBtn.nativeElement.click();
            this.getAllCenters();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }

  showeditCenterModal(item:any){
    console.log(item)
    this.addCenter = false;
    this.editCenter = true;
    this.editCenterForm.patchValue({
      CenterId : item.CenterId,
      CenterName : item.CenterName,
      registrationFees : item.registrationFees
    })
    
  }

  
  submitUpdateCenter(){
    this.submitted = true;
    console.log(this.editCenterForm.value)
   
     if(this.editCenterForm.valid){
    
       var updateCenterData :any = {};
       updateCenterData.CenterId = this.editCenterForm.controls['CenterId'].value;
       updateCenterData.CenterName = this.editCenterForm.controls['CenterName'].value;
       updateCenterData.registrationFees = this.editCenterForm.controls['registrationFees'].value;
        this._adminService.updateCenter(updateCenterData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Center updated successfully!');
            this.closeeditCenterBtn.nativeElement.click();
            this.getAllCenters();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteCenterModal(item:any){
      this.deleteCenterItem = item.centerId;
  }


  deleteCenter(){
      this._adminService.deleteCenter(this.deleteCenterItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Center deleted successfully!');
          this.getAllCenters();
          this.closeDeleteCenterBtn.nativeElement.click();
        }
       
      })
  }

}
