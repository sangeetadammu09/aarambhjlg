import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted: boolean = false;
  userId = localStorage.getItem('userId');

  constructor(private _adminService: AdminService,private _formBuilder : FormBuilder,private _toastrService: ToastrService) {
    this.changePasswordForm = this._formBuilder.group({
      userId: [],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      newPassword:[,Validators.required],
     
    })
   }

  ngOnInit(): void {
  }

  get f(){ return this.changePasswordForm.controls}

  submitChangePassword(){
    this.submitted = true;
    if(this.changePasswordForm.valid && this.userId){
       var addGroupData :any = {};
       addGroupData.userId = JSON.parse(this.userId);
       addGroupData.userName = this.changePasswordForm.controls['userName'].value;
       addGroupData.password = this.changePasswordForm.controls['password'].value;
       addGroupData.newPassword = this.changePasswordForm.controls['newPassword'].value;
       
       this._adminService.changePassword(addGroupData).subscribe((data:any) => {
         //console.log(data.status);
         ////console.log(data.headers.get('X-Custom-Header'));
         if(data.status == 200){
           this._toastrService.success('Password changed successfully!');
           this.submitted = false;
            this.changePasswordForm.reset();
            this.changePasswordForm.markAsUntouched();
            this.changePasswordForm.markAsPristine();
         }
       })
        
     }else{
       //console.log('invalid form')
     }  
  }

}
