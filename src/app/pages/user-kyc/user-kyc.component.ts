import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-user-kyc',
  templateUrl: './user-kyc.component.html',
  styleUrls: ['./user-kyc.component.css']
})
export class UserKycComponent implements OnInit {

  userList: any =[];
  submitted: boolean = false;
  @ViewChild('closeaddUserBtn') closeaddUserBtn: any;
  addUser:boolean = false;
  editUser:boolean = false;
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
  addUserKycForm: FormGroup;
  adduserDocumentName: any;
  userDocumentFile: any;
  addedUserId: any;
  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  userDocument: any;
  
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  userDetailsObj: any = {};
  userDocuments: any = [];
  disableAFDocumentBtn: boolean = false;
  disableABDocumentBtn: boolean = false;
  disablePhotoDocumentBtn: boolean = false;
  disableAddressDocumentBtn: boolean = false;
  disableVoterDocumentBtn: boolean = false;
  
  userDocImage: any ={};
  documentTypePdf : boolean = false;
  documentTypeImage : boolean = false;
  fileUrl: any;
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  noDocumentsFound = true;
  documentPhoto: any;
  documentAadhar: any;
  documentAddress: any;
  documentPan_VoterId: any;


  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder,
     private _toastrService: ToastrService, private sanitizer: DomSanitizer) { 

    this.addUserKycForm = this._formBuilder.group({
      userId: [],
      isAadharVerified: [, Validators.required],
      aadharComment: [],
      isPan_VoterIdVerified: [, Validators.required],
      panComment: [],
      isAddressVerified: [, Validators.required],
      addressComment: [],
      isPhotoVerified: [, Validators.required],
      photoComment: [],
      isKycCompleted: [, Validators.required]
    })  

  }

  ngOnInit(): void {
    this.getAllUserDetails()
    this.getAllCitys()
    
  }

  get f(){ return this.addUserKycForm.controls}
 

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
    this._adminService.getUserListForKycVerification(this.cityId).subscribe((data) => {
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
   
  }


  showUserModal(item:any){
    //console.log(item, 'user item')
    this.submitted = false;
    this.addUserKycForm.reset();
    this.addUserKycForm.markAsUntouched();
    this.addUserKycForm.markAsPristine();
    this.addUserKycForm.controls['isKycCompleted'].setValue('')
    this.addUserKycForm.controls['isPhotoVerified'].setValue('')
    this.addUserKycForm.controls['isAadharVerified'].setValue('')
    this.addUserKycForm.controls['isAddressVerified'].setValue('')
    this.addUserKycForm.controls['isPan_VoterIdVerified'].setValue('')

     this._adminService.getUserKycDetails(item.userId).subscribe((data:any) =>{
      console.log(data.status)
       if(data.status == 200){
        this.noDocumentsFound = false;
         this.userDetailsObj = data.body;
         this.userDocuments = data.body.documents;
         console.log(this.userDocuments)
        this.addUserKycForm.patchValue({userId: data.userId,})
        this.userDocuments.forEach((user:any) =>{
          if(user.documentName == "Photo" || user.documentName == "photo"){

            this.documentPhoto = user.url;
            //this.addUserKycForm.controls['isPhotoVerified'].setValue('Yes')
          }
          if(user.documentName == "Aadhar" || user.documentName == "aadhar"){
            this.documentAadhar = user.url;
           // this.addUserKycForm.controls['isAadharVerified'].setValue('Yes')
          }
          if(user.documentName == "Address" || user.documentName == "address" ){
            this.documentAddress = user.url;
           // this.addUserKycForm.controls['isAddressVerified'].setValue('Yes')
          }
          if(user.documentName == "Pan_VoterId" || user.documentName == "pan_voterid" || user.documentName == "Voter"){
            this.documentPan_VoterId = user.url;
           //this.addUserKycForm.controls['isPan_VoterIdVerified'].setValue('Yes')
          }
        })

       }else if(data.status == 500){
        this.noDocumentsFound = true;
       }
      
     },(err:HttpErrorResponse)=>{
      if(err.status == 500){
        this.documentPhoto = null;
        this.documentAadhar = null;
        this.documentAddress = null;
        this.documentPan_VoterId = null;
            // this.addUserKycForm.controls['isPhotoVerified'].setValue('No')
            // this.addUserKycForm.controls['isAadharVerified'].setValue('No')
            // this.addUserKycForm.controls['isAddressVerified'].setValue('No')
            // this.addUserKycForm.controls['isPan_VoterIdVerified'].setValue('No')
      }
     })
     
    }


  submitNewUser(){
    this.submitted = true;
    console.log(this.addUserKycForm.value)
     if(this.addUserKycForm.valid){
      //  console.log(this.addUserForm.value)
         var addUserData :any = {};
        addUserData.userId = this.userDetailsObj.userId;
        addUserData.isAadharVerified = this.addUserKycForm.controls['isAadharVerified'].value == 'Yes' ? true : false;
        addUserData.aadharComment = this.addUserKycForm.controls['aadharComment'].value;
        addUserData.isPan_VoterIdVerified= this.addUserKycForm.controls['isPan_VoterIdVerified'].value  == 'Yes' ? true : false;
        addUserData.panComment = this.addUserKycForm.controls['panComment'].value;
        addUserData.isAddressVerified = this.addUserKycForm.controls['isAddressVerified'].value  == 'Yes' ? true : false;
        addUserData.addressComment = this.addUserKycForm.controls['addressComment'].value;
        addUserData.isPhotoVerified = this.addUserKycForm.controls['isPhotoVerified'].value  == 'Yes' ? true : false;
        addUserData.photoComment = this.addUserKycForm.controls['photoComment'].value;
        addUserData.isKycCompleted = this.addUserKycForm.controls['isKycCompleted'].value== 'true' ? true : false;
        this._adminService.addUserKycVerification(addUserData).subscribe((data:any) => {
          if(data.status == 200){
           
            this.addedUserId = data.body;
            this._toastrService.success('User Kyc completed successfully!');
            this.closeaddUserBtn.nativeElement.click();
            this.getAllUserDetails();
          }
        })
         
      }else{
        return;
      }  

  }



}


