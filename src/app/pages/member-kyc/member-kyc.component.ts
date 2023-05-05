import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesManagerService } from 'src/app/sales-manager-officer/service/sales-manager.service';

@Component({
  selector: 'app-member-kyc',
  templateUrl: './member-kyc.component.html',
  styleUrls: ['./member-kyc.component.css']
})
export class MemberKycComponent implements OnInit {

  memberList: any =[];
  submitted: boolean = false;
  @ViewChild('closeaddMemberBtn') closeaddMemberBtn: any;
  addMember:boolean = false;
  editMember:boolean = false;
  deleteMemberItem: any;
  membersFound: boolean = false;
  page = 1;
  pagenew = 1;
  total = 20;
  pageSize = 10;
  memberCategoryList: any;
  addMemberTitle ="Add member";
  cityList: any;
  todayDate = new Date().toJSON();
  memberDateofBirth: any;
  addMemberKycForm: FormGroup;
  addmemberDocumentName: any;
  memberDocumentFile: any;
  addedMemberId: any;
  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  memberDocument: any;
  
  cityId = localStorage.getItem('memberCity');
  memberId = localStorage.getItem('memberId');
  memberDetailsObj: any = {};
  memberDocuments: any = [];
  disableAFDocumentBtn: boolean = false;
  disableABDocumentBtn: boolean = false;
  disablePhotoDocumentBtn: boolean = false;
  disableAddressDocumentBtn: boolean = false;
  disableVoterDocumentBtn: boolean = false;
  
  memberDocImage: any ={};
  documentTypePdf : boolean = false;
  documentTypeImage : boolean = false;
  fileUrl: any;
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  noDocumentsFound = true;
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  memberDropdownList: any =[];
  searchMember:any
  documentPhoto: any;
  documentAadhar: any;
  documentAddress: any;
  documentPan_VoterId: any;


  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder,
     private _toastrService: ToastrService, private sanitizer: DomSanitizer, private _salesService: SalesManagerService) { 

    this.addMemberKycForm = this._formBuilder.group({
      memberId: [],
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
    this.getAllMemberDetails()
    this.getAllCitys();
    this.getSalesManagerCenterList();
    this.searchMember ="";
    
  }

  get f(){ return this.addMemberKycForm.controls};

  getSalesManagerCenterList(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    
    this._salesService.getSalesManagerCenterList(this.userId).subscribe((data:any) => {
      console.log(data,'cco member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })
   
  }

  getMemberVal(event:any){
    var searchMemberId = event;
    this._salesService.getMemberListForKycVerification(searchMemberId).subscribe((data:any) => {
      console.log(data,'all memberDropdownList')
      if(data.length > 0){
        this.memberList = data;
      //  this.total = data.page.totalCount;

       }else{
         this.memberList = [];
       } 
     })
  
}


  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getMemberVal(event);
}
 

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

  getAllMemberDetails(){
    
   
  }


//   handlePageChange(event: number){
//     console.log(event)
//     this.page = event;
//     this.getAllMemberDetails();
// }

  


  showMemberModal(item:any){
     console.log(item,'member item')
    this.submitted = false;
    this.addMemberKycForm.reset();
    this.addMemberKycForm.markAsUntouched();
    this.addMemberKycForm.markAsPristine();
    this.addMemberKycForm.controls['isKycCompleted'].setValue('');
    this.addMemberKycForm.controls['isKycCompleted'].setValue('')
    this.addMemberKycForm.controls['isPhotoVerified'].setValue('')
    this.addMemberKycForm.controls['isAadharVerified'].setValue('')
    this.addMemberKycForm.controls['isAddressVerified'].setValue('')
    this.addMemberKycForm.controls['isPan_VoterIdVerified'].setValue('')
     this._salesService.getMemberKycDetails(item.memberId).subscribe((data:any) =>{
      console.log(data.status)
       if(data.status == 200){
        this.noDocumentsFound = false;
         this.memberDetailsObj = data.body;
         this.memberDocuments = data.body.documents;
        this.addMemberKycForm.patchValue({memberId: data.memberId,})
        this.memberDocuments.forEach((member:any) =>{
          if(member.documentName == "Photo" || member.documentName == "photo"){
            //this.addMemberKycForm.controls['isPhotoVerified'].setValue('Yes')
            this.documentPhoto = member.url;
          }
          if(member.documentName == "Aadhar" || member.documentName == "aadhar"){
            //this.addMemberKycForm.controls['isAadharVerified'].setValue('Yes');
            this.documentAadhar = member.url;
          }
          if(member.documentName == "Address" || member.documentName == "address" ){
            //this.addMemberKycForm.controls['isAddressVerified'].setValue('Yes');
            this.documentAddress = member.url;
          }
          if(member.documentName == "Pan_VoterId" || member.documentName == "pan_voterid" ){
           // this.addMemberKycForm.controls['isPan_VoterIdVerified'].setValue('Yes')
           this.documentPan_VoterId = member.url;
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
      }
     })
     
    }


  submitNewMember(){
    this.submitted = true;
     if(this.addMemberKycForm.valid){
      //  console.log(this.addMemberForm.value)
         var addMemberData :any = {};
        
        addMemberData.memberId = this.memberDetailsObj.memberId;
        addMemberData.isAadharVerified = this.addMemberKycForm.controls['isAadharVerified'].value == 'Yes' ? true : false;
        addMemberData.aadharComment = this.addMemberKycForm.controls['aadharComment'].value;
        addMemberData.isPan_VoterIdVerified= this.addMemberKycForm.controls['isPan_VoterIdVerified'].value  == 'Yes' ? true : false;
        addMemberData.panComment = this.addMemberKycForm.controls['panComment'].value;
        addMemberData.isAddressVerified = this.addMemberKycForm.controls['isAddressVerified'].value  == 'Yes' ? true : false;
        addMemberData.addressComment = this.addMemberKycForm.controls['addressComment'].value;
        addMemberData.isPhotoVerified = this.addMemberKycForm.controls['isPhotoVerified'].value  == 'Yes' ? true : false;
        addMemberData.photoComment = this.addMemberKycForm.controls['photoComment'].value;
        addMemberData.isKycCompleted = this.addMemberKycForm.controls['isKycCompleted'].value.value== 'true' ? true : false;;
        this._salesService.addMemberKycVerification(addMemberData).subscribe((data:any) => {
          if(data.status == 200){
           
            this.addedMemberId = data.body;
            this._toastrService.success('member Kyc completed successfully!');
            this.closeaddMemberBtn.nativeElement.click();
            this.getAllMemberDetails();
          }
        })
         
      }else{
     
        return;
      }  

  }



}


