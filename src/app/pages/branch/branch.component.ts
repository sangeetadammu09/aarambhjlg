import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  branchList: any =[];
  addBranchForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddBranchBtn') closeaddBranchBtn: any;
  @ViewChild('closeeditBranchBtn') closeeditBranchBtn:any;
  @ViewChild('closeDeleteBranchBtn') closeDeleteBranchBtn:any;
  addBranch:boolean = false;
  editBranch:boolean = false;
  editBranchForm: FormGroup;
  deleteBranchItem: any;
  p = 1;
  productsFound: boolean = false;
  managerList: any;
  todayDate = new Date().toJSON();
  cityList: any;
  selectedBranchItem: any;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addBranchForm = this._formBuilder.group({
      branchId: [],
      cityName: [],
      cityId: ['', Validators.required],
      branchName: ['', Validators.required],
      branchCode:[,Validators.required],
      branchAddress:[,Validators.required],
      managerId:[,Validators.required],
      managerName:[],
      isActive:[,Validators.required]
    })

    this.editBranchForm = this._formBuilder.group({
      branchId: [],
      cityName: [],
      cityId: ['', Validators.required],
      branchName: ['', Validators.required],
      branchCode:[,Validators.required],
      branchAddress:[,Validators.required],
      managerId:[,Validators.required],
      managerName:[],
      isActive:[,Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllBranches()
    this.getAllManager()
    this.getAllCitys()
    
  }

  get f(){ return this.addBranchForm.controls}
  get g(){ return this.editBranchForm.controls}


  getAllBranches(){
    this._adminService.getAllBranch().subscribe((data) => {
    //  console.log(data,'all Branchs')
     if(data.length > 0){
    //  this.productsFound = true;
       this.branchList = data;
      }else{
        this.branchList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
    //  console.log(data,'all Citys')
     if(data.length > 0){
    //  this.productsFound = true;
       this.cityList = data;
      }else{
        this.cityList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllManager(){
    this._adminService.getAllManager().subscribe((data) => {
     // console.log(data,'all Managers')
     if(data.length > 0){
       this.managerList = data;
      }else{
        this.managerList = [];
      }
      
    })
  }

  showaddBranchModal(){
    this.addBranch = true;
    this.editBranch = false
    this.submitted = false;
    this.addBranchForm.reset();
    this.addBranchForm.markAsUntouched();
    this.addBranchForm.markAsPristine();
    this.addBranchForm.controls['isActive'].setValue('true');
    this.addBranchForm.controls['managerId'].setValue('')
    this.addBranchForm.controls['cityId'].setValue('')
    
  }

  submitNewBranch(){
    this.submitted = true;
     if(this.addBranchForm.valid){
      //  console.log(this.addBranchForm.value)
        var addBranchData :any = {};
        addBranchData.branchId = 0;
        addBranchData.branchName = this.addBranchForm.controls['branchName'].value;
        addBranchData.branchCode = this.addBranchForm.controls['branchCode'].value;
        addBranchData.cityId = this.addBranchForm.controls['cityId'].value;
        addBranchData.branchAddress = this.addBranchForm.controls['branchAddress'].value;
        addBranchData.managerId = this.addBranchForm.controls['managerId'].value;
        addBranchData.isActive = JSON.parse(this.addBranchForm.controls['isActive'].value);
        addBranchData.createdBy = 0;
        addBranchData.createdDate = this.todayDate;
        addBranchData.updatedBy = 0;
        addBranchData.updatedDate = this.todayDate;
        this._adminService.addBranch(addBranchData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Branch added successfully!');
            this.closeaddBranchBtn.nativeElement.click();
            this.getAllBranches();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }

  showeditBranchModal(item:any){
    console.log(item,item.managerId)
    this.selectedBranchItem = item;
    this.addBranch = false;
    this.editBranch = true;
    this.editBranchForm.patchValue({
      branchId : item.branchId,
      branchName : item.branchName,
      branchCode : item.branchCode,
      cityId : item.cityId,
      branchAddress : item.branchAddress,
      //managerId : item.managerId,
      isActive : JSON.stringify(item.isActive),
    })

    this.editBranchForm.controls['managerId'].setValue(item.managerId)
    
  }

  submitUpdateBranch(){
    this.submitted = true;
    console.log(this.editBranchForm.value)
   
     if(this.editBranchForm.valid){
        var updateBranchData :any = {};
        updateBranchData.branchId = this.editBranchForm.controls['branchId'].value;
        updateBranchData.branchName = this.editBranchForm.controls['branchName'].value;
        updateBranchData.branchCode = this.editBranchForm.controls['branchCode'].value;
        updateBranchData.cityId = this.editBranchForm.controls['cityId'].value;
        updateBranchData.branchAddress = this.editBranchForm.controls['branchAddress'].value;
        updateBranchData.managerId = this.editBranchForm.controls['managerId'].value;
        updateBranchData.isActive = JSON.parse(this.editBranchForm.controls['isActive'].value);
        updateBranchData.createdBy = this.selectedBranchItem.createdBy;
        updateBranchData.createdDate = this.selectedBranchItem.createdDate;
        updateBranchData.updatedBy = this.selectedBranchItem.updatedBy == null ? 0 : this.selectedBranchItem.updatedBy;
        updateBranchData.updatedDate = this.todayDate;
        this._adminService.updateBranch(updateBranchData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Branch updated successfully!');
            this.closeeditBranchBtn.nativeElement.click();
            this.getAllBranches();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteBranchModal(item:any){
      this.deleteBranchItem = item.branchId;
  }


  deleteBranch(){
      this._adminService.deleteBranch(this.deleteBranchItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Branch deleted successfully!');
          this.getAllBranches();
          this.closeDeleteBranchBtn.nativeElement.click();
        }
       
      })
  }

}

