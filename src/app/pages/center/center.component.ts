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
  branchList:any=[];
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
  roleNo = localStorage.getItem('roleNo');
  cityList: any;
  salesOfficerList: any;
  relationOfficerList: any;
  salesManagerList: any;
  todayDate = new Date().toJSON();
  pageLoaded: boolean = false;
  showAddBtn: boolean = true;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addCenterForm = this._formBuilder.group({
      centerName: ['', Validators.required],
      centerNo: ['', Validators.required],
      centerAddress: ['', Validators.required],
      cityId: [, Validators.required],
      branchId: [, Validators.required],
      soId: [, Validators.required],
      roId: [, Validators.required],
      smId: [, Validators.required],
      createdBy: [],
      createdDate: []
     
    })

    this.editCenterForm = this._formBuilder.group({
      centerId :[],
      centerName: ['', Validators.required],
      centerNo: ['', Validators.required],
      centerAddress: ['', Validators.required],
      cityId: [, Validators.required],
      branchId: [, Validators.required],
      soId: [, Validators.required],
      roId: [, Validators.required],
      smId: [, Validators.required],
      createdBy: [],
      createdDate: [],
      updatedBy: [],
      updatedDate:[]
    })
  }

  ngOnInit(): void {
    this.getAllCenters();
    this.getAllCitys();
    this.getAllRelationOfficerByCity();
    this.getAllSalesManagersByCity();
    this.getAllSalesOfficerByCity();
    if(this.roleNo == "104" || this.roleNo == "101"){
      this.showAddBtn = false;
      
    }
  }

  get f(){ return this.addCenterForm.controls}
  get g(){ return this.editCenterForm.controls}


  getAllCenters(){
    this._adminService.getAllCentersByCityId(this.cityId).subscribe((data) => {
      console.log(data,'all Centers')
     if(data.length > 0){
      this.pageLoaded = true;
       this.CenterList = data;
      }else{
        this.CenterList = [];
        this.pageLoaded = true;
      }
      
    })
  }
  getBranchList(){
    console.log(this.addCenterForm.controls['cityId'].value)
     let cityId = this.addCenterForm.controls['cityId'].value;
     if(cityId == undefined){
     cityId = this.editCenterForm.controls['cityId'].value;
     console.log(cityId)
     }
    this._adminService.getBranchesByCityId(cityId).subscribe((data) => {
      console.log(data,'all branches')
      this.addCenterForm.controls['branchId'].setValue('')
     if(data.length > 0){
       this.branchList = data;

      }else{
        this.branchList = [];
      }
      
    })
  }

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
     //console.log(data,'all Citys')
     if(data.length > 0){
  
       this.cityList = data;
      }else{
        this.cityList = [];
      }
      
    })
  }

  getAllSalesOfficerByCity(){
    this._adminService.getAllSalesOfficerByCity(this.cityId).subscribe((data) => {
   //console.log(data,'all getAllSalesOfficerByCity')
     if(data.length > 0){
  
       this.salesOfficerList = data;
      }else{
        this.salesOfficerList = [];
      }
      
    })
  }

  getAllRelationOfficerByCity(){
    this._adminService.getAllRelationOfficerByCity(this.cityId).subscribe((data) => {
     //console.log(data,'all getAllRelationOfficerByCity')
     if(data.length > 0){
  
       this.relationOfficerList = data;
      }else{
        this.relationOfficerList = [];
      }
      
    })
  }

  getAllSalesManagersByCity(){
    this._adminService.getAllSalesManagersByCity(this.cityId).subscribe((data) => {
    //console.log(data,'all getAllSalesManagersByCity')
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
      //  //console.log(this.addCenterForm.value)
        var addCenterData :any = {};
       // addCenterData.centerId = 0;
        addCenterData.centerName = this.addCenterForm.controls['centerName'].value;
        addCenterData.centerNo = this.addCenterForm.controls['centerNo'].value;
        addCenterData.centerAddress = this.addCenterForm.controls['centerAddress'].value;
        addCenterData.cityId = this.addCenterForm.controls['cityId'].value;
        addCenterData.branchId = this.addCenterForm.controls['branchId'].value;
        addCenterData.soId = this.addCenterForm.controls['soId'].value;
        addCenterData.roId = this.addCenterForm.controls['roId'].value;
        addCenterData.smId = this.addCenterForm.controls['smId'].value;
        addCenterData.createdBy = 0;
        addCenterData.createdDate = this.todayDate;
       
        this._adminService.addCenter(addCenterData).subscribe((data:any) => {
          //console.log(data.status);
          ////console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Center added successfully!');
            this.closeaddCenterBtn.nativeElement.click();
            this.getAllCenters();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }

  showeditCenterModal(item:any){
    //console.log(item)
    this.addCenter = false;
    this.editCenter = true;
    this.editCenterForm.patchValue({
      centerId : item.centerId,
      centerName: item.centerName ,
      centerNo: item.centerNo,
      centerAddress: item.centerAddress,
      cityId: item.cityId,
      branchId: item.branchId,
      soId: item.soId,
      roId: item.roId,
      smId: item.smId,
      createdBy: item.createdBy,
      createdDate: item.createdDate,
    })
    
  }

  
  submitUpdateCenter(){
    this.submitted = true;
    //console.log(this.editCenterForm.value)
   
     if(this.editCenterForm.valid){
    
       var updateCenterData :any = {};
        updateCenterData.centerId =  this.editCenterForm.controls['centerId'].value;
        updateCenterData.centerName = this.editCenterForm.controls['centerName'].value;
        updateCenterData.centerNo = this.editCenterForm.controls['centerNo'].value;
        updateCenterData.centerAddress = this.editCenterForm.controls['centerAddress'].value;
        updateCenterData.cityId = this.editCenterForm.controls['cityId'].value;
        updateCenterData.branchId = this.editCenterForm.controls['branchId'].value;
        updateCenterData.soId = this.editCenterForm.controls['soId'].value;
        updateCenterData.roId = this.editCenterForm.controls['roId'].value;
        updateCenterData.smId = this.editCenterForm.controls['smId'].value;
        updateCenterData.createdBy = this.editCenterForm.controls['createdBy'].value;
        updateCenterData.createdDate = this.editCenterForm.controls['createdDate'].value;
        updateCenterData.updatedBy = 0;
        updateCenterData.updatedDate = this.todayDate;
        this._adminService.updateCenter(updateCenterData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Center updated successfully!');
            this.closeeditCenterBtn.nativeElement.click();
            this.getAllCenters();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }


  showdeleteCenterModal(item:any){
      this.deleteCenterItem = item.centerId;
  }


  deleteCenter(){
      this._adminService.deleteCenter(this.deleteCenterItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('Center deleted successfully!');
          this.getAllCenters();
          this.closeDeleteCenterBtn.nativeElement.click();
        }
       
      })
  }

}
