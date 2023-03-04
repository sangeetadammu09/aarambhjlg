import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../service/common.service';
import { decodeToken, isTokenValid } from '../../utils/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;
   submitted :boolean = false;
   decodedToken!:any;
   loginText = "Login"

  constructor( private _router: Router, private _fb: FormBuilder,private _toastrService: ToastrService, 
    private _commonService: CommonService) { 
     this.loginForm = this._fb.group({
        username : ['', Validators.required],
        password : ['', Validators.required]
     })
  }


  ngOnInit(): void {
    
  }

  get f() {return this.loginForm.controls;}

  login(){
    this.submitted = true;
    if(this.loginForm.valid){
    //  console.log(this.loginForm.value)
      localStorage.clear();
      var loginFormData = new FormData();
      loginFormData.append('username', this.loginForm.controls['username'].value);
      loginFormData.append('password', this.loginForm.controls['password'].value);

      this._commonService.login(loginFormData).subscribe((data:any) => {
        if(data){
          this.decodedToken = decodeToken(data.access_token);
         // console.log(this.decodedToken);         
          localStorage.setItem('fullname', this.decodedToken.FullName);
          localStorage.setItem('roles',this.decodedToken.role)
          this._toastrService.success('Logged in successfully!');
          this._router.navigate(['/admin/products-category'])
        }else{
          this._toastrService.info('Logging in. Please hold on!');
        }
      })
       
    }else{
      console.log('invalid login')
    }
  }

}
