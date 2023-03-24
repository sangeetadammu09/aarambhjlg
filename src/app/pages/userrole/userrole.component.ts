import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent implements OnInit {
  userRoleList: any =[];
  addUserRoleForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddUserRoleBtn') closeaddUserRoleBtn: any;
  @ViewChild('closeeditUserRoleBtn') closeeditUserRoleBtn:any;
  @ViewChild('closeDeleteUserRoleBtn') closeDeleteUserRoleBtn:any;
  addUserRole:boolean = false;
  editUserRole:boolean = false;
  editUserRoleForm: FormGroup;
  deleteUserRoleItem: any;
  page = 1;
  total = 20;
  pageSize = 10;
  productsFound: boolean = false;
  userList: any;
  cityId = localStorage.getItem('userCity');
  roleList: any;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addUserRoleForm = this._formBuilder.group({
      roleId: ['', Validators.required],
      userId: ['', Validators.required],
    })

    this.editUserRoleForm = this._formBuilder.group({
      roleId: ['', Validators.required],
      userId: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllUserRoles()
  }

  get f(){ return this.addUserRoleForm.controls}
  get g(){ return this.editUserRoleForm.controls}


  getAllUserRoles(){
    this._adminService.getAllUsersByCity(this.cityId).subscribe((data) => {
   //   console.log(data,'all UserRoles')
     if(data.length > 0){
       this.userRoleList = data;

      }else{
        this.userRoleList = [];
      } 
    })
  }

  showaddUserRoleModal(){
    this.addUserRole = true;
    this.editUserRole = false
    this.submitted = false;
    this.addUserRoleForm.reset();
    this.addUserRoleForm.markAsUntouched();
    this.addUserRoleForm.markAsPristine();
    this.addUserRoleForm.controls['roleId'].setValue('')
    this.addUserRoleForm.controls['userId'].setValue('')
    this._adminService.getAllUsersListByCity(this.cityId).subscribe((data:any) => {
         this.userList = data;
    })
    this._adminService.getAllRoles().subscribe((data:any) => {
      console.log(data)
      if(data.length > 0){
      this.roleList = data;
      }
    })
    
    
  }

  submitNewUserRole(){
    this.submitted = true;
     if(this.addUserRoleForm.valid){
      //  console.log(this.addUserRoleForm.value)
        var addUserRoleData :any = {};
        addUserRoleData.roleId = this.addUserRoleForm.controls['roleId'].value;
        addUserRoleData.userId = this.addUserRoleForm.controls['userId'].value;
       
        this._adminService.addUserRole(addUserRoleData).subscribe((data:any) => {
          console.log(data.status);
          if(data.status == 200){
            this._toastrService.success('User Role added successfully!');
            this.closeaddUserRoleBtn.nativeElement.click();
            this.getAllUserRoles();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }

  showeditUserRoleModal(item:any){
    console.log(item)
    this.addUserRole = false;
    this.editUserRole = true;
    this.editUserRoleForm.patchValue({
      roleId : item.roleId,
      userId : item.usersInfo.userId,
    })
    
  }
  
  submitUpdateUserRole(){
    this.submitted = true;
    console.log(this.editUserRoleForm.value)
   
     if(this.editUserRoleForm.valid){
    
       var updateUserRoleData :any = {};
       updateUserRoleData.roleId = this.editUserRoleForm.controls['roleId'].value;
       updateUserRoleData.userId = this.editUserRoleForm.controls['userId'].value;
        this._adminService.updateUserRole(updateUserRoleData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('UserRole updated successfully!');
            this.closeeditUserRoleBtn.nativeElement.click();
            this.getAllUserRoles();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteUserRoleModal(item:any){
    console.log(item)
      this.deleteUserRoleItem = item;
  }


  deleteUserRole(){
      this._adminService.deleteUserRole(this.deleteUserRoleItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('UserRole delete successfully!');
          this.getAllUserRoles();
          this.closeDeleteUserRoleBtn.nativeElement.click();
       }
       
      })
  }

}
