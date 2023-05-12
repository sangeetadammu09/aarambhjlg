import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

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
  pagenew = 1;
  total = 20;
  pageSize = 10;
  userCategoryList: any;
  addUserTitle ="Add User";
  cityList: any;
  todayDate = new Date().toJSON();
  userDateofBirth: any;
  addUserDocumentForm: FormGroup;
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
  addJKycDocumentForm: FormGroup;

  familyPhotoName: any ="Choose File";
  drivingLicenseName: any ="Choose File";
  joiningLetterName: any ="Choose File";
  bankPassbookName: any ="Choose File";
  educationDocName: any ="Choose File";
  releavingLetterName: any ="Choose File";
  previousSalarySlipsName: any ="Choose File";
  voterDocumentName: any ="Choose File";
  
  familyPhotoFile: any ;
  drivingLicenseFile:any;
  joiningLetterFile:any;
  bankPassbookFile:any;
  educationDocFile:any;
  releavingLetterFile:any;
  previousSalarySlipsFile:any;
  voterFile: any;
  
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  userDetailsObj: any = {};
  userDocuments: any = [];
  disableAFDocumentBtn: boolean = false;
  disableABDocumentBtn: boolean = false;
  disablePhotoDocumentBtn: boolean = false;
  disableAddressDocumentBtn: boolean = false;
  disableVoterDocumentBtn: boolean = false;
  disableFamilyDocumentBtn: boolean = false;
  disableDLDocumentBtn: boolean = false;
  disableJoiningLetterBtn: boolean = false;
  disablePassbookBtn: boolean = false;
  disableEducationBtn: boolean = false;
  disableReleavingLetterBtn: boolean = false;
  disablepreviousSalarySlipsBtn: boolean = false;
  userDocImage: any ={};
  documentTypePdf : boolean = false;
  documentTypeImage : boolean = false;
  fileUrl: any;
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  sampleUrl: string = 'https://jlg.examfirst.in/Images/UserDocuments/15504358912023-04-07.pdf';


  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder,
     private _toastrService: ToastrService, private sanitizer: DomSanitizer) { 
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

    this.addJKycDocumentForm = this._formBuilder.group({
      userId : [],
      familyPhoto:[],
      drivingLicense:[],
      joiningLetter:[],
      bankPassbook:[],
      educationDocument:[],
      releavingLetter:[],
      previousSalarySlips : []
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
    this.getAllUserDetails()
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

  getAllUserDetails(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    this._adminService.getAllUsersByCity(this.cityId).subscribe((data) => {
      //   console.log(data,'all UserRoles')
        if(data.length > 0){
          this.userList = data;
   
         }else{
           this.userList = [];
         } 
       })
   
  }


  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getAllUserDetails();
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
    this.familyPhotoName ="Choose File";
    this.drivingLicenseName ="Choose File";
    this.joiningLetterName ="Choose File";
    this.bankPassbookName ="Choose File";
    this.educationDocName ="Choose File";
    this.releavingLetterName ="Choose File";
    this.previousSalarySlipsName ="Choose File";
    this.voterDocumentName ="Choose File";
    this.aadhaarFrontDocumentName ="Choose File";
    this.aadhaarBackDocumentName ="Choose File";
    this.photoDocumentName ="Choose File";
    this.addressDocumentName ="Choose File";

    this.disableAFDocumentBtn = false;
    this.disableABDocumentBtn = false;
    this.disablePhotoDocumentBtn = false;
    this.disableAddressDocumentBtn = false;
    this.disableVoterDocumentBtn = false;
    this.disableFamilyDocumentBtn = false;
    this.disableDLDocumentBtn = false;
    this.disableJoiningLetterBtn = false;
    this.disablePassbookBtn = false;
    this.disableEducationBtn = false;
    this.disableReleavingLetterBtn = false;
    this.disablepreviousSalarySlipsBtn = false;
   
  }

  addProdTab(){
    this.addUserTitle ="Add User";
  }

  uploadProdImages(){
    this.addUserTitle ="Upload User Documents";
  }

  uploadKycDocument(){
    this.addUserTitle ="Upload KYC Documents";
  } 

  changeDateOfBirth(event: any){
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
          
            this.getAllUserDetails();
          }
        })
         
      }else{
     
        console.log('invalid form')
      }  

  }

  uploadAadhaarFrontDocument(file: any) {
    this.aadhaarFrontFile='';
    this.aadhaarFrontDocumentName =  "Aadhaar Front"
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.aadhaarFrontFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitAFDocument(){
    console.log('submitAFDocument',this.aadhaarFrontFile)
    if(this.aadhaarFrontFile != undefined){
      this.userDocument =  this.aadhaarFrontDocumentName;
      this.userDocumentFile = this.aadhaarFrontFile;
      if(this.addedUserId){
        console.log(this.addedUserId)
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Aadhaar Front  added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableAFDocumentBtn = true;
           this.getAllUserDetails();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Aadhaar Front');
         }
        }
        )
         
      }else{
        this._toastrService.error('No user found');
      }
   }else{
    this._toastrService.error('Please upload Aadhaar Front');
  }
  }

  uploadAadhaarBackDocument(file: any) {
    this.aadhaarBackFile='';
    this.aadhaarBackDocumentName = "Aadhaar Back" 
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.aadhaarBackFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitABDocument(){
    if(this.aadhaarBackFile != undefined){
      this.userDocument =  this.aadhaarBackDocumentName;
      this.userDocumentFile = this.aadhaarBackFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){        
            this._toastrService.success('Aadhaar Back added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
           this.disableABDocumentBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Aadhaar Back');
         }
        })
         
     }else{
      this._toastrService.error('No user found');
    }
   }else{
    this._toastrService.error("Please upload Aadhaar Back")
   }
  }

  uploadPhotoDocument(file: any) {
    this.photoFile='';
    this.photoDocumentName =  "Photo"
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.photoFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitPhoto(){
    if(this.photoFile != undefined){
      this.userDocument =  this.photoDocumentName;
      this.userDocumentFile = this.photoFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Photo added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
           this.disablePhotoDocumentBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Photo');
         }
        })
         
      }else{
        this._toastrService.error('No user found');
      }
      }else{
        this._toastrService.error("Please upload Photo")
      }
  }

  uploadAddressDocument(file: any) {
    this.addressFile='';
    this.addressDocumentName = "Address";
    var temp = file.target.files[0].name
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.addressFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitAddress(){
    if(this.addressFile != undefined){
      this.userDocument =  this.addressDocumentName;
      this.userDocumentFile = this.addressFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Address Document added successfully!');
          //  this.closeaddUserBtn.nativeElement.click();
          this.disableAddressDocumentBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Address Document');
         }
        })
         
      }else{
        this._toastrService.error('No user found');
      }
   }else{
    this._toastrService.error("Please upload Address Document")
   }
  }

  uploadVoterDocument(file: any) {
    this.voterFile='';
    this.voterDocumentName = "Voter";
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.voterFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitVoterDoc(){
    if(this.voterFile != undefined){
      this.userDocument =  this.voterDocumentName;
      this.userDocumentFile = this.voterFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Voter/PAN added successfully!');
         //   this.closeaddUserBtn.nativeElement.click();
         this.disableVoterDocumentBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Voter/PAN');
         }
        })
         
      }else{
        this._toastrService.error('No user found');
      }
      }else{
        this._toastrService.error("Please upload Voter/PAN")
      }
  }


  uploadFamilyPhotoDoc(file:any){
    this.familyPhotoFile='';
    this.familyPhotoName = "Family Photo";
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.familyPhotoFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
    
  }

  submitFamilyPhoto(){
    if(this.familyPhotoFile != undefined){
      this.userDocument =  this.familyPhotoName;
      this.userDocumentFile = this.familyPhotoFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Family Photo added successfully!');
          //  this.closeaddUserBtn.nativeElement.click();
          this.disableFamilyDocumentBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Resume');
         }
        })
         
     }else{
      this._toastrService.error('No user found');
      }
      }else{
        this._toastrService.error("Please upload Resume")
      }

  }

  uploadDrivingLicenseDoc(file:any){
    this.drivingLicenseFile='';
    this.drivingLicenseName = "Driving License";
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.drivingLicenseFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }

  }

  submitDrivingLicense(){
    if(this.drivingLicenseFile != undefined){
      this.userDocument =  this.drivingLicenseName;
      this.userDocumentFile = this.drivingLicenseFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Driving License added successfully!');
         //   this.closeaddUserBtn.nativeElement.click();
         this.disableDLDocumentBtn  = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload driving license');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload driving license")
    }
  }

  uploadJoiningLetterDoc(file:any){
    this.joiningLetterFile='';
    this.joiningLetterName = "Joining Letter";
    var temp = file.target.files[0].name;
    if(temp.includes('.pdf')) {
      this.joiningLetterFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PDF is allowed')
    }
  }

  submitJoiningLetter(){
    if(this.joiningLetterFile != undefined){
      this.userDocument =  this.joiningLetterName;
      this.userDocumentFile = this.joiningLetterFile;
      this.addedUserId = 45
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);   
        console.log(addUserDocumentData,'joining') 
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Joining Letter added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
           this.disableJoiningLetterBtn  = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload joining letter');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload joining letter")
    }

  }

  uploadBankPassbookDoc(file:any){
    this.bankPassbookFile='';
    this.bankPassbookName = "Bank Passbook";
    var temp = file.target.files[0].name;
    if(temp.includes('.png') || temp.includes('.jpg')) {
      this.bankPassbookFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitBankPassbook(){
    if(this.bankPassbookFile != undefined){
      this.userDocument =  this.bankPassbookName;
      this.userDocumentFile = this.bankPassbookFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Bank Passbook added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
           this.disablePassbookBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload bank passbook');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload bank passbook")
    }

  }

  uploadEducationDoc(file:any){
    this.educationDocFile='';
    this.educationDocName = "Education";
    var temp = file.target.files[0].name;

    if(temp.includes('.pdf')) {
      this.educationDocFile = file.target.files;
    }else{
      this._toastrService.error('Only PDF document is allowed')
    }

  }

  submitEducationDoc(){
    if(this.educationDocFile != undefined){
      this.userDocument =  this.educationDocName;
      this.userDocumentFile = this.educationDocFile;
      this.addedUserId = 45
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
        console.log(addUserDocumentData,'education');
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Education document added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
           this.disableEducationBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload education document');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload education document")
    }

  }

  uploadReleavingLetter(file:any){
    this.releavingLetterFile='';
    this.releavingLetterName = "Releaving Letter";

    let temp = file.target.files[0].name;
    if(temp.includes('.pdf')) {
      this.releavingLetterFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PDF document is allowed')
    }

  }

  submitReleavingLetter(){
    if(this.releavingLetterFile != undefined){
      this.userDocument =  this.releavingLetterName;
      this.userDocumentFile = this.releavingLetterFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Releaving Letter added successfully!');
           // this.closeaddUserBtn.nativeElement.click();
            this.disableReleavingLetterBtn = true;
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload releaving letter');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload releaving letter")
    }
  }

  uploadpreviousSalarySlips(file:any){
    this.previousSalarySlipsFile='';
    this.previousSalarySlipsName = "Previous Salary Slips";
    let temp = file.target.files[0].name;
    if(temp.includes('.pdf')) {
      this.previousSalarySlipsFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PDF document is allowed')
    }

  }

  submitpreviousSalarySlips(){
    if(this.previousSalarySlipsFile != undefined){
      this.userDocument =  this.previousSalarySlipsName;
      this.userDocumentFile = this.previousSalarySlipsFile;
      if(this.addedUserId){
        var addUserDocumentData = new FormData();
        addUserDocumentData.append('UserId',this.addedUserId);
        addUserDocumentData.append('DocumentName',this.userDocument);
        addUserDocumentData.append('file',this.userDocumentFile);    
 
        this._adminService.addUserOtherDocuments(addUserDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Previous Salary Slips added successfully!');
            this.disablepreviousSalarySlipsBtn = true;
            this.closeaddUserBtn.nativeElement.click();
            this.getAllUserDetails();
          } 
        },(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload previous salary slips');
         }
        })   
     }else{
      this._toastrService.error('No user found');
    }
    }else{
      this._toastrService.warning("Please upload previous salary slips")
    }
  }


  deleteUser(){
  //     this._adminService.deleteUser(this.deleteUserItem).subscribe((data:any) =>{
  //       console.log(data)
  //       if(data.status == 200){
  //         this._toastrService.success('User delete successfully!');
  //         this.getAllUserDetails();
  //         this.closeDeleteUserBtn.nativeElement.click();
  //       }
       
  //     })
   }

showUserModal(item:any){
   // console.log(item)
    this._adminService.getAllUserDetails(item.usersInfo.userId).subscribe((data:any) =>{
      if(data){
        this.userDetailsObj = data;
        this.userDocuments = data.documents;
       // console.log(this.userDetailsObj)
      }
     
    })
    
   }

  showUserDocuments(item:any){
     this.userDocImage = item;
  //   this.fileUrl = 'https://jlg.examfirst.in/Images/UserDocuments/15504358912023-04-07.pdf';
     if(item.fileType == ".png" || item.fileType == ".jpg"){
        this.documentTypePdf = false;
        this.documentTypeImage = true;
        this.fileUrl =  item.url;
      }else if(item.fileType == ".pdf"){
       this.documentTypePdf = true;
       this.documentTypeImage = false;
       this.fileUrl = item.url;
       
      }
   }


}


