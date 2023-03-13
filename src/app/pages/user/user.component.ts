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
  aadhaarFrontDocumentName: any ="Choose File";
  aadhaarBackDocumentName: any ="Choose File";
  photoDocumentName: any ="Choose File";
  addressDocumentName: any ="Choose File";
  viewMode = 'tab1';
  addedUserId: any;
  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  userDocument: any;

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
      userId : [],
      aadhaarFrontDocument:[],
      aadhaarBackDocument:[],
      photoDocument:[],
      addressDocument:[]
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
       //   console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
           
            this.addedUserId = data.body;
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

 uploadAadhaarFrontDocument(file: any) {
    this.aadhaarFrontFile='';
    this.aadhaarFrontDocumentName = file.target.files[0].name;
    if(this.aadhaarFrontDocumentName.includes('.png') || this.aadhaarFrontDocumentName.includes('.jpg')) {
      this.aadhaarFrontFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  
   
  }

  uploadAadhaarBackDocument(file: any) {
    this.aadhaarBackFile='';
    this.aadhaarBackDocumentName = file.target.files[0].name;
    if(this.aadhaarBackDocumentName.includes('.png') || this.aadhaarBackDocumentName.includes('.jpg')) {
      this.aadhaarBackFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  
   
  }

  uploadPhotoDocument(file: any) {
    this.photoFile='';
    this.photoDocumentName = file.target.files[0].name;
    if(this.photoDocumentName.includes('.png') || this.photoDocumentName.includes('.jpg')) {
      this.photoFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  
   
  }

  uploadAddressDocument(file: any) {
    this.addressFile='';
    this.addressDocumentName = file.target.files[0].name;
    if(this.addressDocumentName.includes('.png') || this.addressDocumentName.includes('.jpg')) {
      this.addressFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
   
   
  }

  submitUserDocument(){
    console.log(this.addressFile,this.aadhaarFrontFile,this.aadhaarBackFile,this.photoFile)
    if(this.aadhaarFrontFile != undefined && this.aadhaarBackFile == undefined && this.addressFile == undefined && this.photoFile == undefined){
       this.userDocument =  this.aadhaarFrontDocumentName;
       this.userDocumentFile = this.aadhaarFrontFile
    }else if(this.aadhaarFrontFile == undefined && this.aadhaarBackFile != undefined && this.addressFile == undefined && this.photoFile == undefined){
      this.userDocument =  this.aadhaarBackDocumentName;
      this.userDocumentFile = this.aadhaarBackFile;
   }else if(this.aadhaarFrontFile == undefined && this.aadhaarBackFile == undefined && this.addressFile != undefined && this.photoFile == undefined){
    this.userDocument =  this.addressDocumentName;
    this.userDocumentFile = this.addressFile;
   }else if(this.aadhaarFrontFile == undefined && this.aadhaarBackFile == undefined && this.addressFile == undefined && this.photoFile != undefined){
    this.userDocument =  this.photoFile;
    this.userDocumentFile = this.photoFile;
   }else{
    this._toastrService.warning("Please upload one document at a time")
   }
   
    if(this.addedUserId){
       var addUserDocumentData = new FormData();
       addUserDocumentData.append('UserId',this.addedUserId);
       addUserDocumentData.append('DocumentName',this.userDocument);
       addUserDocumentData.append('file',this.userDocumentFile);    

       this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
         if(data.status == 200){
          
           this._toastrService.success('Documents added successfully!');
           this.closeaddUserBtn.nativeElement.click();
           this.getAllUsers();
         } 
       },(error:any) => {
        if(error.status == 500){
        this._toastrService.error('Please upload correct documents');
        }
       })
        
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


