import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { CommonService } from './common/service/common.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  token :any = localStorage.getItem('userToken');
  refreshToken :any = localStorage.getItem('refreshToken');
  refresh: boolean = false;
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
       	 if (err.status === 401 && !this.refresh) {
          this.refresh = true;
       	 // redirect user to the login page
         var refreshTokenObj = new FormData();
         refreshTokenObj.append('accessToken',this.token);
         refreshTokenObj.append('refreshToken',this.refreshToken);
         this._commonService.refreshToken(refreshTokenObj).pipe(
           switchMap((res: any) => {
             console.log(res,"res");
              const newAccessToken = res.accessToken
             const newRefreshToken = res.refreshToken
             
             localStorage.setItem('newAccessToken',newAccessToken);
             localStorage.setItem('newRefreshToken',newRefreshToken);
             return next.handle(request.clone({
               setHeaders: {
                 Authorization: `Bearer ${newAccessToken}`
               }
             }));
           })
         ) as Observable<HttpEvent<any>>;
     	}

 	 }
    this.refresh = false;
    return throwError(() => err);
	})
   )
  }

 

}





