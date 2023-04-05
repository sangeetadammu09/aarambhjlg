import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupList: any =[];
  addGroupForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddGroupBtn') closeaddGroupBtn: any;
  @ViewChild('closeeditGroupBtn') closeeditGroupBtn:any;
  @ViewChild('closeDeleteGroupBtn') closeDeleteGroupBtn:any;
  addGroup:boolean = false;
  editGroup:boolean = false;
  editGroupForm: FormGroup;
  deleteGroupItem: any;
  p = 1;
  productsFound: boolean = false;
  centerList: any;
  todayDate = new Date().toJSON();
  cityList: any;
  selectedGroupItem: any;
  cityId = localStorage.getItem('userCity');

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addGroupForm = this._formBuilder.group({
      groupId: [],
      groupName: ['', Validators.required],
      groupNo: ['', Validators.required],
      cityId:[,Validators.required],
      centerId:[,Validators.required],
      createdBy:[''],
    })

    this.editGroupForm = this._formBuilder.group({
      groupId: [],
      groupName: ['', Validators.required],
      groupNo: ['', Validators.required],
      cityId:[,Validators.required],
      centerId:[,Validators.required],
      updatedBy:[''],
    })
  }

  ngOnInit(): void {
    this.getAllGroups();
    this.getCenterDropdownByCityId();
    this.getAllCitys();
    
  }

  get f(){ return this.addGroupForm.controls}
  get g(){ return this.editGroupForm.controls}


  getAllGroups(){
    this._adminService.getAllGroupsByCityId(this.cityId).subscribe((data) => {
     if(data.length > 0){
       this.groupList = data;
      }else{
        this.groupList = [];
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

  showaddGroupModal(){
    this.addGroup = true;
    this.editGroup = false
    this.submitted = false;
    this.addGroupForm.reset();
    this.addGroupForm.markAsUntouched();
    this.addGroupForm.markAsPristine();
    this.addGroupForm.controls['cityId'].setValue('')
    this.addGroupForm.controls['centerId'].setValue('')
    
  }

  submitNewGroup(){
    this.submitted = true;
     if(this.addGroupForm.valid){
      //  console.log(this.addGroupForm.value)
        var addGroupData :any = {};
        addGroupData.groupId = 0;
        addGroupData.groupName = this.addGroupForm.controls['groupName'].value;
        addGroupData.groupCode = this.addGroupForm.controls['groupNo'].value;
        addGroupData.cityId = this.addGroupForm.controls['cityId'].value;
        addGroupData.groupAddress = this.addGroupForm.controls['centerId'].value;
        addGroupData.createdBy = 0;
        
        this._adminService.addGroup(addGroupData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Group added successfully!');
            this.closeaddGroupBtn.nativeElement.click();
            this.getAllGroups();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }

  showeditGroupModal(item:any){
    console.log(item,item.managerId)
    this.selectedGroupItem = item;
    this.addGroup = false;
    this.editGroup = true;
    this.editGroupForm.patchValue({
      groupId : item.groupId,
      groupName : item.groupName,
      groupNo : item.groupNo,
      cityId : item.cityId,
      centerId : item.centerId,
    })
    
  }

  submitUpdateGroup(){
    this.submitted = true;
  //  console.log(this.editGroupForm.value)
   
     if(this.editGroupForm.valid){
        var updateGroupData :any = {};
        updateGroupData.groupId = 0;
        updateGroupData.groupName = this.editGroupForm.controls['groupName'].value;
        updateGroupData.groupCode = this.editGroupForm.controls['groupNo'].value;
        updateGroupData.cityId = this.editGroupForm.controls['cityId'].value;
        updateGroupData.groupAddress = this.editGroupForm.controls['centerId'].value;
        updateGroupData.updatedBy = 0;

        this._adminService.updateGroup(updateGroupData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Group updated successfully!');
            this.closeeditGroupBtn.nativeElement.click();
            this.getAllGroups();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteGroupModal(item:any){
      this.deleteGroupItem = item.groupId;
  }


  deleteGroup(){
      this._adminService.deleteGroup(this.deleteGroupItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Group deleted successfully!');
          this.getAllGroups();
          this.closeDeleteGroupBtn.nativeElement.click();
        }
       
      })
  }

}


