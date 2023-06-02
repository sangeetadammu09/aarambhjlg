import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';

@Component({
  selector: 'app-assign-leader',
  templateUrl: './assign-leader.component.html',
  styleUrls: ['./assign-leader.component.css']
})
export class AssignLeaderComponent implements OnInit {

  assignLeaderForm: FormGroup;
  submitted: boolean = false;
  centerDropdownList:any = [];
  memberDropdownList:any = [];
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId')

  constructor(private _adminService: AdminService,private _formBuilder : FormBuilder,private _toastrService: ToastrService,
    private _salesService: SalesRelationService,) {
    this.assignLeaderForm = this._formBuilder.group({
      id: [],
      centerId: ['', Validators.required],
      memberId: ['', Validators.required]
     
    })
   }

  ngOnInit(): void {
    this.getCenterList()
  }

  get f(){ return this.assignLeaderForm.controls}

  getCenterList(){
    this._adminService.getAllCenter(this.cityId).subscribe((data:any) => {
      console.log(data,'center')
        if(data.length > 0){
          this.centerDropdownList = data;
         }else{
           this.centerDropdownList = [];
         } 
       })
   
  }

  getCenterVal(){
    var searchMemberId = this.assignLeaderForm.controls['centerId'].value;
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data:any) => {
      console.log(data,'all memberDropdownList')
      if(data.length > 0){
        this.memberDropdownList = data;
       }else{
         this.memberDropdownList = [];
       } 
     })
  
  }


  submitAssignLeader(){
    this.submitted = true;
    if(this.assignLeaderForm.valid){
       var assignLeaderData :any = {};
       assignLeaderData.centerId = this.assignLeaderForm.controls['centerId'].value;
       assignLeaderData.memberId = this.assignLeaderForm.controls['memberId'].value;
    
       this._adminService.assignLeaderToCenter(assignLeaderData.centerId,assignLeaderData.memberId).subscribe((data:any) => {
         //console.log(data.status);
         ////console.log(data.headers.get('X-Custom-Header'));
         if(data.status == 200){
           this._toastrService.success('Leader Assigned Successfully!');
           this.submitted = false;
            this.assignLeaderForm.reset();
            this.assignLeaderForm.markAsUntouched();
            this.assignLeaderForm.markAsPristine();
         }
       })
        
     }else{
       //console.log('invalid form')
     }  
  }

}
