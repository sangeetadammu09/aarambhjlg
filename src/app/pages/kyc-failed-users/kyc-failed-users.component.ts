import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-kyc-failed-users',
  templateUrl: './kyc-failed-users.component.html',
  styleUrls: ['./kyc-failed-users.component.css']
})
export class KycFailedUsersComponent implements OnInit {

  userList: any =[];
  pageLoaded: boolean = true;
  page: number = 1;
  pageSize: any = 10;
  total:number = 0;
  roleNo = localStorage.getItem('roleNo');
  cityid = localStorage.getItem('userCity');
  centerDropdownList: any = [];
  searchCenter:any='';
  centerId:any;
  userDetailsObj:any;
  aadhaarFrontDocumentName: any ="Choose File";
  aadhaarBackDocumentName: any ="Choose File";
  photoDocumentName: any ="Choose File";
  addressDocumentName: any ="Choose File";
  securityDocumentName : any ="Choose File";
  voterDocumentName: any ="Choose File";
  addedUserId: any;

  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  UserDocument: any;
  voterFile: any;
  securityFile: any;
  UserDocumentFile: any;

  disableAFDocumentBtn: boolean = false;
  disableABDocumentBtn: boolean = false;
  disablePhotoDocumentBtn: boolean = false;
  disableAddressDocumentBtn: boolean = false;
  disableVoterDocumentBtn: boolean = false;
  disableSecurityDocumentBtn : boolean = false;

  showAadharVerifyForm : boolean = false;
  showPan_VoterIdVerifyForm : boolean = false;
  showAddressVerifyForm : boolean = false;
  showPhotoVerifyForm : boolean = false;
 

  constructor(private _adminService: AdminService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
     this.getAllFailedUsersDetails();
  }

  getAllFailedUsersDetails(){
    this.pageLoaded = false;
    this._adminService.getKycFailedUsers(this.cityid,this.page,this.pageSize).subscribe((data:any) => {
        console.log(data,'all KycFailedUsers')
       
        if(data.length > 0){
          this.userList = data;
          this.pageLoaded = true;
   
         }else{
           this.userList = [];
           this.pageLoaded = true;
         } 
       })
   
  }


showUserModal(item:any){
   this._adminService.getUserKycStatus(item.userId, this.cityid).subscribe((data) => {
    console.log(data)
    data ? this.userDetailsObj = data : this.userDetailsObj = {};
    if(this.userDetailsObj){
      this.addedUserId = this.userDetailsObj.userId;
      this.userDetailsObj.isAadharVerified == true  ? this.showAadharVerifyForm = true : this.showAadharVerifyForm = false;
      this.userDetailsObj.isPan_VoterIdVerified == true  ? this.showPan_VoterIdVerifyForm = true : this.showPan_VoterIdVerifyForm = false;
      this.userDetailsObj.isAddressVerified == true  ? this.showAddressVerifyForm = true: this.showAddressVerifyForm = false;
      this.userDetailsObj.isPhotoVerified == true  ? this.showPhotoVerifyForm = true : this.showPhotoVerifyForm = false;
    }
   })
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
  //console.log('submitAFDocument',this.aadhaarFrontFile)
  if(this.aadhaarFrontFile != undefined){
    this.UserDocument =  this.aadhaarFrontDocumentName;
    this.UserDocumentFile = this.aadhaarFrontFile;
    if(this.addedUserId){
      //console.log(this.addedUserId)
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Aadhaar Front  added successfully!');
        // this.closeaddUserBtn.nativeElement.click();
          this.disableAFDocumentBtn = true;
         this.getAllFailedUsersDetails();
        } 
      }
      ,(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Aadhaar Front');
       }
      }
      )
       
    }else{
      this._toastrService.error('No User found');
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
    this.UserDocument =  this.aadhaarBackDocumentName;
    this.UserDocumentFile = this.aadhaarBackFile;
    if(this.addedUserId){
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){        
          this._toastrService.success('Aadhaar Back added successfully!');
         // this.closeaddUserBtn.nativeElement.click();
         this.disableABDocumentBtn = true;
          this.getAllFailedUsersDetails();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Aadhaar Back');
       }
      })
       
   }else{
    this._toastrService.error('No User found');
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
    this.UserDocument =  this.photoDocumentName;
    this.UserDocumentFile = this.photoFile;
    if(this.addedUserId){
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Photo added successfully!');
         // this.closeaddUserBtn.nativeElement.click();
         this.disablePhotoDocumentBtn = true;
          this.getAllFailedUsersDetails();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Photo');
       }
      })
       
    }else{
      this._toastrService.error('No User found');
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
    this.UserDocument =  this.addressDocumentName;
    this.UserDocumentFile = this.addressFile;
    if(this.addedUserId){
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Address Document added successfully!');
        //  this.closeaddUserBtn.nativeElement.click();
        this.disableAddressDocumentBtn = true;
          this.getAllFailedUsersDetails();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Address Document');
       }
      })
       
    }else{
      this._toastrService.error('No User found');
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
    this.UserDocument =  this.voterDocumentName;
    this.UserDocumentFile = this.voterFile;
    if(this.addedUserId){
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Voter/PAN added successfully!');
       //   this.closeaddUserBtn.nativeElement.click();
       this.disableVoterDocumentBtn = true;
          this.getAllFailedUsersDetails();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Voter/PAN');
       }
      })
       
    }else{
      this._toastrService.error('No User found');
    }
    }else{
      this._toastrService.error("Please upload Voter/PAN")
    }
}


uploadSecurityDocument(file: any) {
  this.securityFile='';
  this.securityDocumentName = "Secuity Check"
  var temp = file.target.files[0].name;
  if(temp.includes('.png') || temp.includes('.jpg')) {
    this.securityFile = file.target.files[0];
  }else{
    this._toastrService.error('Only PNG or JPG document is allowed')
  }
}

submitSecurityDoc(){
  if(this.securityFile != undefined){
    this.UserDocument =  this.securityDocumentName;
    this.UserDocumentFile = this.securityFile;
    if(this.addedUserId){
      var addUserDocumentData = new FormData();
      addUserDocumentData.append('UserId',this.addedUserId);
      addUserDocumentData.append('DocumentName',this.UserDocument);
      addUserDocumentData.append('file',this.UserDocumentFile);    

      this._adminService.addUserDocuments(addUserDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Security Cheque  added successfully!');
       //   this.closeaddUserBtn.nativeElement.click();
       this.disableSecurityDocumentBtn = true;
          this.getAllFailedUsersDetails();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Voter/PAN');
       }
      })
       
    }else{
      this._toastrService.error('No User found');
    }
    }else{
      this._toastrService.error("Please upload Voter/PAN")
    }
}


  

}
