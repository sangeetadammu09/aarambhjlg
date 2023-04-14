import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin/service/admin.service';
import { SalesRelationService } from '../../sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  memberList: any =[];
  addMemberForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddMemberBtn') closeaddMemberBtn: any;
  @ViewChild('closeeditMemberBtn') closeeditMemberBtn:any;
  @ViewChild('closeDeleteMemberBtn') closeDeleteMemberBtn:any;
  addMember:boolean = false;
  editMember:boolean = false;
  deleteMemberItem: any;
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  MemberCategoryList: any;
  addMemberTitle ="Add Member";
  cityList: any;
  todayDate = new Date().toJSON();
  MemberDateofBirth: any;
  addMemberDocumentForm: any;
  addMemberDocumentName: any;
  MemberDocumentFile: any;
  aadhaarFrontDocumentName: any ="Choose File";
  aadhaarBackDocumentName: any ="Choose File";
  photoDocumentName: any ="Choose File";
  addressDocumentName: any ="Choose File";
  securityDocumentName : any ="Choose File";
  viewMode = 'tab1';
  addedMemberId: any;
  aadhaarFrontFile: any;
  aadhaarBackFile: any;
  photoFile: any;
  addressFile: any;
  MemberDocument: any;
  voterFile: any;
  securityFile: any;
  voterDocumentName: any;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  MemberId = localStorage.getItem('MemberId');
  MemberDetailsObj: any = {};
  MemberDocuments: any = [];
  disableAFDocumentBtn: boolean = false;
  disableABDocumentBtn: boolean = false;
  disablePhotoDocumentBtn: boolean = false;
  disableAddressDocumentBtn: boolean = false;
  disableVoterDocumentBtn: boolean = false;
  disableSecurityDocumentBtn : boolean = false;
  centerList: any = [];
  memberDropdownList :any = [];
  searchMember :any;
  memberDetailsObj: any ={};
  memberDocuments: any;
  memberDocImage: any;
  documentTypePdf: boolean = false;
  documentTypeImage: boolean = false;
  fileUrl: any;
  pagenew = 1;
  roleNo = localStorage.getItem('roleNo');
  

  constructor(private _salesService: SalesRelationService, private _formBuilder : FormBuilder,
     private _toastrService: ToastrService, private _adminService: AdminService,) { 
    this.addMemberForm = this._formBuilder.group({    
      memberId: [],
      centerId: [, Validators.required],
      cityId: [, Validators.required],
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      spouse: ['', Validators.required],
      spouseDateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      mobileNo: ['', Validators.required],
      stayThere: ['', Validators.required],
      workingAs: ['', Validators.required],
      familyMembers: [, Validators.required],
      anyOneStudying: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      validTillDate: ['', Validators.required],
      isKycVerified: [],
      paidRegistrationFees: [, Validators.required] ,
      isActive: [],
      isDeleted: [],
      createdBy: [] ,
      createdDate: [] 
    })

    this.addMemberDocumentForm = this._formBuilder.group({
      MemberId : [],
      aadhaarFrontDocument:[],
      aadhaarBackDocument:[],
      photoDocument:[],
      addressDocument:[]
    })


  }

  ngOnInit(): void {
  //this.getAllMemberDetails();
    this.getAllCitys();
    this.getCenterDropdownByCityId();
    this.getOfficersCenterList();
    this.searchMember ="";
  }

  get f(){ return this.addMemberForm.controls}
  get h(){ return this.addMemberDocumentForm.controls}
 

  getAllMemberDetails(){
    this._salesService.getCenterWiseMemberList(this.cityId).subscribe((data) => {
        console.log(data,'all memberDropdownList')
        if(data.length > 0){
          this.memberList = data;
   
         }else{
           this.memberList = [];
         } 
       })
   
  }

  getOfficersCenterList(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    if(this.roleNo == '101'){
      this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data) =>{
        console.log(data,'admin member')
        if(data.length > 0){
          this.memberDropdownList = data;
   
         }else{
           this.memberDropdownList = [];
         } 
       })

    }else if(this.roleNo == '102')
    this._salesService.getOfficersCenterList(this.cityId,this.userId).subscribe((data) => {
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
      this._salesService.getCenterWiseMemberList(searchMemberId).subscribe((data) => {
        console.log(data,'all memberDropdownList')
        if(data.length > 0){
          this.memberList = data;
   
         }else{
           this.memberList = [];
         } 
       })
    
  }

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
     if(data.length > 0){
       this.cityList = data;
      }else{
        this.cityList = [];
      }
      
    })
  }

  getCenterDropdownByCityId(){
    this._adminService.getCenterDropdownByCityId(this.cityId).subscribe((data) => {
     // console.log(data,'all Managers')
     if(data.length > 0){
       this.centerList = data;
      }else{
        this.centerList = [];
      }
      
    })
  }



  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getAllMemberDetails();
}

  showaddMemberModal(){
    this.submitted = false;
    this.addMemberForm.reset();
    this.addMemberForm.markAsUntouched();
    this.addMemberForm.markAsPristine();
    this.addMemberDocumentForm.reset();
    this.addMemberDocumentForm.markAsUntouched();
    this.addMemberDocumentForm.markAsPristine();
    this.addMemberForm.controls['cityId'].setValue('')
    this.addMemberForm.controls['centerId'].setValue('');
   
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
   
  }

  addProdTab(){
    this.addMemberTitle ="Add Member";
  }

  uploadProdImages(){
    this.addMemberTitle ="Upload Member Documents";
  }
 

  // changeDateOfBirth(event:any){
  //   //  console.log(event.target.value, 'event')
  //     var dob = event.target.value
  //     var dt = new Date(dob);
  //     this.MemberDateofBirth = dt.toISOString();

  // }

  submitNewMember(){
    this.submitted = true;
     if(this.addMemberForm.valid){
      //  console.log(this.addMemberForm.value)
      
        var addMemberData :any = {};
        addMemberData.memberId = 0;
        addMemberData.fullName = this.addMemberForm.controls['fullName'].value;
        //addMemberData.email = this.addMemberForm.controls['email'].value;
        addMemberData.mobileNo= this.addMemberForm.controls['mobileNo'].value;
        addMemberData.address = this.addMemberForm.controls['address'].value;
        var dob = new Date(this.addMemberForm.controls['dateOfBirth'].value);
        addMemberData.dateOfBirth = dob.toISOString();
        addMemberData.address = this.addMemberForm.controls['address'].value;
        addMemberData.spouse = this.addMemberForm.controls['spouse'].value;
        var sdob = new Date(this.addMemberForm.controls['spouseDateOfBirth'].value);
        addMemberData.spouseDateOfBirth = sdob.toISOString();
        addMemberData.familyMembers = this.addMemberForm.controls['familyMembers'].value;
        addMemberData.cityId = this.addMemberForm.controls['cityId'].value;
        addMemberData.centerId = this.addMemberForm.controls['centerId'].value;
        addMemberData.stayThere   = this.addMemberForm.controls['stayThere'].value,
        addMemberData.workingAs = this.addMemberForm.controls['workingAs'].value,
        addMemberData.familyMembers = this.addMemberForm.controls['familyMembers'].value,
        addMemberData.anyOneStudying = this.addMemberForm.controls['anyOneStudying'].value;
        var doj = new Date(this.addMemberForm.controls['dateOfJoining'].value);
        addMemberData.dateOfJoining = doj.toISOString();
        var vt = new Date(this.addMemberForm.controls['validTillDate'].value);
        addMemberData.validTillDate = vt.toISOString();
        addMemberData.paidRegistrationFees = this.addMemberForm.controls['paidRegistrationFees'].value,
        addMemberData.createdBy = 0;
        addMemberData.createdDate =this.todayDate;
        addMemberData.isActive =true;
        addMemberData.isDeleted = false;
        addMemberData.isKycVerified = true;

        this._salesService.addMember(addMemberData).subscribe((data:any) => {
       //   console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
           
            this.addedMemberId = data.body;
            this._toastrService.success('Member added successfully!');
            this.viewMode = 'tab2';
           // this.closeaddMemberBtn.nativeElement.click();
          
            this.getAllMemberDetails();
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
      this.MemberDocument =  this.aadhaarFrontDocumentName;
      this.MemberDocumentFile = this.aadhaarFrontFile;
      if(this.addedMemberId){
        console.log(this.addedMemberId)
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Aadhaar Front  added successfully!');
          // this.closeaddMemberBtn.nativeElement.click();
            this.disableAFDocumentBtn = true;
           this.getAllMemberDetails();
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
      this.MemberDocumentFile = this.aadhaarBackFile;
      if(this.addedMemberId){
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){        
            this._toastrService.success('Aadhaar Back added successfully!');
           // this.closeaddMemberBtn.nativeElement.click();
           this.disableABDocumentBtn = true;
            this.getAllMemberDetails();
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
      this.MemberDocumentFile = this.photoFile;
      if(this.addedMemberId){
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Photo added successfully!');
           // this.closeaddMemberBtn.nativeElement.click();
           this.disablePhotoDocumentBtn = true;
            this.getAllMemberDetails();
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
      this.MemberDocumentFile = this.addressFile;
      if(this.addedMemberId){
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Address Document added successfully!');
          //  this.closeaddMemberBtn.nativeElement.click();
          this.disableAddressDocumentBtn = true;
            this.getAllMemberDetails();
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
      this.MemberDocumentFile = this.voterFile;
      if(this.addedMemberId){
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Voter/PAN added successfully!');
         //   this.closeaddMemberBtn.nativeElement.click();
         this.disableVoterDocumentBtn = true;
            this.getAllMemberDetails();
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
      this.MemberDocumentFile = this.securityFile;
      if(this.addedMemberId){
        var addMemberDocumentData = new FormData();
        addMemberDocumentData.append('MemberId',this.addedMemberId);
        addMemberDocumentData.append('DocumentName',this.MemberDocument);
        addMemberDocumentData.append('file',this.MemberDocumentFile);    
 
        this._salesService.addMemberDocuments(addMemberDocumentData).subscribe((data:any) => {
          if(data.status == 200){
           
            this._toastrService.success('Security Check added successfully!');
         //   this.closeaddMemberBtn.nativeElement.click();
         this.disableSecurityDocumentBtn = true;
            this.getAllMemberDetails();
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


  showMemberModal(item:any){
     console.log(item)
     this._salesService.getAllMemberDetails(item.memberId).subscribe((data:any) =>{
       if(data){
         this.memberDetailsObj = data;
         this.memberDocuments = data.documents;
        // console.log(this.userDetailsObj)
       }
      
     })
     
    }
 
   showMemberDocuments(item:any){
      this.memberDocImage = item;
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


