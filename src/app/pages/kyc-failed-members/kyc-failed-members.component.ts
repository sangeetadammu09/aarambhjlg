import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-kyc-failed-members',
  templateUrl: './kyc-failed-members.component.html',
  styleUrls: ['./kyc-failed-members.component.css']
})
export class KycFailedMembersComponent implements OnInit {
  memberList: any =[];
  pageLoaded: boolean = true;
  page: number = 1;
  pageSize: any = 10;
  total:number = 0;
  roleNo = localStorage.getItem('roleNo');
  cityid = localStorage.getItem('userCity');
  centerDropdownList: any = [];
  searchCenter:any='';
  centerId:any;
  memberDetailsObj:any;
  aadhaarFrontDocumentName: any ="Choose File";
  aadhaarBackDocumentName: any ="Choose File";
  photoDocumentName: any ="Choose File";
  addressDocumentName: any ="Choose File";
  securityDocumentName : any ="Choose File";
  voterDocumentName: any ="Choose File";
  addedMemberId: any;

  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  MemberDocument: any;
  voterFile: any;
  securityFile: any;
  memberDocumentFile: any;

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
 

  constructor(private _salesService: SalesRelationService, private _adminService: AdminService, private _toastrService: ToastrService) { }

  ngOnInit(): void {
   this.getAllCentersByCityId();
  }

  getAllCentersByCityId(){
    this._adminService.getAllCentersByCityId(this.cityid).subscribe((data:any) => {
     if(data.length > 0){
       this.centerDropdownList = data;
      }else{
        this.centerDropdownList = [];
      }
      
    })
  }

  getAllFailedMembersDetails(val:any){
    this.pageLoaded = false;
    this._salesService.getKycFailedMembers(val,this.pageSize,this.page).subscribe((data) => {
        //console.log(data,'all memberList')
       
        if(data.length > 0){
          this.memberList = data;
          this.pageLoaded = true;
   
         }else{
           this.memberList = [];
           this.pageLoaded = true;
         } 
       })
   
  }


showMemberModal(item:any){
   this._salesService.getMemberKycStatus(item.memberId, this.cityid).subscribe((data) => {
    data ? this.memberDetailsObj = data : this.memberDetailsObj = {};
    if(this.memberDetailsObj){
      this.addedMemberId = this.memberDetailsObj.memberId;
      this.memberDetailsObj.isAadharVerified == true  ? this.showAadharVerifyForm = true : this.showAadharVerifyForm = false;
      this.memberDetailsObj.isPan_VoterIdVerified == true  ? this.showPan_VoterIdVerifyForm = true : this.showPan_VoterIdVerifyForm = false;
      this.memberDetailsObj.isAddressVerified == true  ? this.showAddressVerifyForm = true: this.showAddressVerifyForm = false;
      this.memberDetailsObj.isPhotoVerified == true  ? this.showPhotoVerifyForm = true : this.showPhotoVerifyForm = false;
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
    this.MemberDocument =  this.aadhaarFrontDocumentName;
    this.memberDocumentFile = this.aadhaarFrontFile;
    if(this.addedMemberId){
      //console.log(this.addedMemberId)
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Aadhaar Front  added successfully!');
        // this.closeaddMemberBtn.nativeElement.click();
          this.disableAFDocumentBtn = true;
         this.getAllCentersByCityId();
        } 
      }
      ,(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Aadhaar Front');
       }
      }
      )
       
    }else{
      this._toastrService.error('No Member found');
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
    this.MemberDocument =  this.aadhaarBackDocumentName;
    this.memberDocumentFile = this.aadhaarBackFile;
    if(this.addedMemberId){
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){        
          this._toastrService.success('Aadhaar Back added successfully!');
         // this.closeaddMemberBtn.nativeElement.click();
         this.disableABDocumentBtn = true;
          this.getAllCentersByCityId();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Aadhaar Back');
       }
      })
       
   }else{
    this._toastrService.error('No Member found');
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
    this.MemberDocument =  this.photoDocumentName;
    this.memberDocumentFile = this.photoFile;
    if(this.addedMemberId){
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Photo added successfully!');
         // this.closeaddMemberBtn.nativeElement.click();
         this.disablePhotoDocumentBtn = true;
          this.getAllCentersByCityId();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Photo');
       }
      })
       
    }else{
      this._toastrService.error('No Member found');
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
    this.MemberDocument =  this.addressDocumentName;
    this.memberDocumentFile = this.addressFile;
    if(this.addedMemberId){
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Address Document added successfully!');
        //  this.closeaddMemberBtn.nativeElement.click();
        this.disableAddressDocumentBtn = true;
          this.getAllCentersByCityId();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Address Document');
       }
      })
       
    }else{
      this._toastrService.error('No Member found');
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
    this.MemberDocument =  this.voterDocumentName;
    this.memberDocumentFile = this.voterFile;
    if(this.addedMemberId){
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Voter/PAN added successfully!');
       //   this.closeaddMemberBtn.nativeElement.click();
       this.disableVoterDocumentBtn = true;
          this.getAllCentersByCityId();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Voter/PAN');
       }
      })
       
    }else{
      this._toastrService.error('No Member found');
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
    this.MemberDocument =  this.securityDocumentName;
    this.memberDocumentFile = this.securityFile;
    if(this.addedMemberId){
      var addMemberDocumentData = new FormData();
      addMemberDocumentData.append('MemberId',this.addedMemberId);
      addMemberDocumentData.append('DocumentName',this.MemberDocument);
      addMemberDocumentData.append('file',this.memberDocumentFile);    

      this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
        if(data.status == 200){
         
          this._toastrService.success('Security Cheque  added successfully!');
       //   this.closeaddMemberBtn.nativeElement.click();
       this.disableSecurityDocumentBtn = true;
          this.getAllCentersByCityId();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Please upload Voter/PAN');
       }
      })
       
    }else{
      this._toastrService.error('No Member found');
    }
    }else{
      this._toastrService.error("Please upload Voter/PAN")
    }
}


  

}
