import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import * as moment from 'moment';

declare var $ : any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: any =[];
  addUserForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddUserBtn') closeaddUserBtn: any;
  @ViewChild('closeeditUserBtn') closeeditUserBtn:any;
  @ViewChild('closeDeleteUserBtn') closeDeleteUserBtn:any;
  addUser:boolean = false;
  editUser:boolean = false;
  editUserForm: FormGroup;
  deleteUserItem: any;
  usersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  userCategoryList: any;
  addUserTitle ="Add User";
  cityList: any;
  todayDate = new Date().toJSON();
  userDateofBirth: any;
  addUserDocumentForm: any;
  adduserDocumentName: any;
  userDocumentFile: any;
  userDocumentName: any ="Choose File";
  viewMode = 'tab1';

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addUserForm = this._formBuilder.group({
      userId: [],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      familyDetails: ['', Validators.required],
      username: ['', Validators.required],
      password:[] ,
      passwordHash: [],
      isMobileVerified: [],
      cityId: ['', Validators.required],
      isActive: [, Validators.required],
      isDeleted: [],
      createdBy: 0,
      createdDate: ['']     
    })

    this.addUserDocumentForm = this._formBuilder.group({
      userId : [,Validators.required],
      documentName : [],
      file : [,Validators.required]
    })

    this.editUserForm = this._formBuilder.group({
      userId: [],
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNo: ['', Validators.required],
      address: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      familyDetails: ['', Validators.required],
      username: ['', Validators.required],
      password:[] ,
      passwordHash: [],
      isMobileVerified: [],
      cityId: ['', Validators.required],
      isActive: [, Validators.required],
      isDeleted: [, Validators.required],
      createdBy: 0,
      createdDate: ['']   
    })

  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllCitys()
    
  }

  get f(){ return this.addUserForm.controls}
  get h(){ return this.addUserDocumentForm.controls}
  get g(){ return this.editUserForm.controls}

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
  //   console.log(data,'all Citys')
     if(data.length > 0){
    //  this.productsFound = true;
       this.cityList = data;
      }else{
        this.cityList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllUsers(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    this._adminService.getAllUser(paginationObj.pageNo,paginationObj.pageSize).subscribe((data) => {
      console.log(data,'all Users')
     if(data.length > 0){
    //  this.usersFound = true;
       this.userList = data;
       //this.total = data.total;
      }else{
        this.userList = [];
       // this.usersFound = false;
      }
      
    })
  }


  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getAllUsers();
}

  showaddUserModal(){
    this.submitted = false;
    this.addUserForm.reset();
    this.addUserForm.markAsUntouched();
    this.addUserForm.markAsPristine();
    this.addUserDocumentForm.reset();
    this.addUserDocumentForm.markAsUntouched();
    this.addUserDocumentForm.markAsPristine();
    this.addUserForm.controls['cityId'].setValue('')
    this.addUserForm.controls['isActive'].setValue('true');
    // $('.datepicker').datepicker({
    //   language: "es",
    //   autoclose: true,
    //   format: "dd/mm/yyyy"
    // });
  }

  addProdTab(){
    this.addUserTitle ="Add User";
   
  }

  uploadProdImages(){
    this.addUserTitle ="Upload User Documents";
    
  }

  changeDateOfBirth(event:any){
    //  console.log(event.target.value, 'event')
      var dob = event.target.value
      var dt = new Date(dob);
      this.userDateofBirth = dt.toISOString();

  }

 
  submitNewUser(){
    this.submitted = true;
     if(this.addUserForm.valid){
      //  console.log(this.addUserForm.value)
        var addUserData :any = {};
        addUserData.userId = 0;
        addUserData.fullName = this.addUserForm.controls['fullName'].value;
        addUserData.email = this.addUserForm.controls['email'].value;
        addUserData.mobileNo= this.addUserForm.controls['mobileNo'].value;
        addUserData.address = this.addUserForm.controls['address'].value;
        addUserData.dateOfBirth = this.userDateofBirth;
        addUserData.familyDetails = this.addUserForm.controls['familyDetails'].value;
        addUserData.username = this.addUserForm.controls['username'].value;
        addUserData.password = "";
        addUserData.passwordHash = "";
        addUserData.isMobileVerified = false;
        addUserData.cityId = this.addUserForm.controls['cityId'].value;
        addUserData.isActive = JSON.parse(this.addUserForm.controls['isActive'].value);
        addUserData.createdBy = 0;
        addUserData.createdDate =this.todayDate;
        addUserData.isDeleted = false;

        this._adminService.addUser(addUserData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('User added successfully!');
            this.viewMode = 'tab2';
           // this.closeaddUserBtn.nativeElement.click();
          
            this.getAllUsers();
          }
        })
         
      }else{
     
        console.log('invalid form')
      }  

  }

  uploadUserDocument(file: any) {
    this.userDocumentFile='';
    this.userDocumentName = file.target.files[0].name;
    if(this.userDocumentName.includes('.png') || this.userDocumentName.includes('.jpg')) {
      this.userDocumentFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
   // console.log(this.userDocumentFile)
   
  }

  submitUserDocument(){

    this.submitted = true;
    if(this.addUserDocumentForm.valid){
     //  console.log(this.addUserForm.value)
       var addUserDocumentData = new FormData();
       addUserDocumentData.append('UserId',this.addUserDocumentForm.controls['userId'].value);
       addUserDocumentData.append('DocumentName',this.userDocumentName);
       addUserDocumentData.append('file',this.userDocumentFile);    

       this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
         console.log(data.status);
         //console.log(data.headers.get('X-Custom-Header'));
         if(data.status == 200){
           this._toastrService.success('Documents added successfully!');
           this.closeaddUserBtn.nativeElement.click();
           this.getAllUsers();
         } 
       },(error:any) => {
        if(error.status == 500){
        this._toastrService.error('Please upload correct data');
        }
       })
        
     }else{
       console.log('invalid form')
     }  
  }



  // showeditUserModal(item:any){
  //   console.log(item)
  //   this.addUser = false;
  //   this.editUser = true;
  //   this.editUserForm.patchValue({
  //     userId: item.userId,
  //     userName: item.userName,
  //     hsnCode: item.hsnCode,
  //     catId: item.catId,
  //     unitId: item.unitId,
  //     saleTaxId: item.saleTaxId,
  //     barcode: item.barcode,
  //     description: item.description,
  //     purchaseTaxId: item.purchaseTaxId,
  //     discountId: item.discountId,
  //     barcodeStatus: item.barcodeStatus,
  //     userEnglishName: item.userEnglishName,
  //     isDiscountApplicable: item.isDiscountApplicable,
  //     createdBy: item.createdBy,
  //     createdDate: item.createdDate,
  //     updatedBy: item.updatedBy,
  //     updatedDate: item.updatedDate,
  //     mfd: item.mfd,
  //     expiryDate: item.expiryDate,
  //     batchNo: item.batchNo,     
  //   })
    
  // }


  
  // submitUpdateUser(){
  //   this.submitted = true;
  //   console.log(this.editUserForm.value)
   
  //    if(this.editUserForm.valid){
    
  //      var updateUserData :any = {};
  //      updateUserData.userId = this.editUserForm.controls['userId'].value;
  //      updateUserData.userName = this.editUserForm.controls['userName'].value;
  //      updateUserData.registrationFees = this.editUserForm.controls['registrationFees'].value;
  //       this._adminService.updateUser(updateUserData).subscribe((data:any) => {
  //         if(data){
  //           this._toastrService.success('User updated successfully!');
  //           this.closeeditUserBtn.nativeElement.click();
  //           this.getAllUsers();
  //         }
  //       })
         
  //     }else{
  //       console.log('invalid form')
  //     }  

  // }


  // showdeleteUserModal(item:any){
  //     this.deleteUserItem = item.userId;
  // }


  deleteUser(){
  //     this._adminService.deleteUser(this.deleteUserItem).subscribe((data:any) =>{
  //       console.log(data)
  //       if(data.status == 200){
  //         this._toastrService.success('User delete successfully!');
  //         this.getAllUsers();
  //         this.closeDeleteUserBtn.nativeElement.click();
  //       }
       
  //     })
   }

}


