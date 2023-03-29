import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CommonService } from './common/service/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  token = localStorage.getItem('userToken');
  refreshToken = localStorage.getItem('refreshToken');
  constructor(private _commonService: CommonService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    
   // console.log('setting token from interceptor', token) 
   if (this.token) {
     // If we have a token, we set it to the header 
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.token}`}
     });
  }

  return next.handle(request).pipe(catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
         console.log(err)
       	 if (err.status === 401) {
       	 // redirect user to the login page
         //refresh token
         if(this.token && this.refreshToken){
         var refreshTokenObj = new FormData();
         refreshTokenObj.append('accessToken',this.token);
         refreshTokenObj.append('refreshToken',this.refreshToken);
        this._commonService.refreshToken(refreshTokenObj).subscribe((data:any) => {
          console.log(data,'refresh token')
          localStorage.setItem('userToken', data.access_token);  
          localStorage.setItem('refreshToken', data.refreshToken);   
        })
      }

     	}
 	 }
  	return throwError(err);
	})
   )
  }

 

}
