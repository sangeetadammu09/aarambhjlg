import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { CommonService } from './common/service/common.service';
import { MasterService } from './master.service';

const TOKEN_HEADER_KEY = 'Authorization';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  isRefreshingToken: boolean = false;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  //  const jwtToken = JSON.parse(atob(this.token.split('.')[1]));
    //  const expires = new Date(jwtToken.exp * 1000);
    //  const timeout = expires.getTime() - Date.now();
    
  constructor(private _commonService: CommonService, private masterService: MasterService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.masterService.getToken();
    console.log(token,'logged token')
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token :any= this.masterService.getToken();
      const refreshToken:any = this.masterService.getRefreshToken();
      var refreshTokenObj = new FormData();
      refreshTokenObj.append('accessToken',token);
      refreshTokenObj.append('refreshToken',refreshToken);

      if (token)    
        return this._commonService.refreshToken(refreshTokenObj).pipe(switchMap((token: any) => {
            this.isRefreshing = false;
            console.log(token.body.access_token,'token in isRefreshing')
            this.masterService.saveToken(token.access_token);
            this.refreshTokenSubject.next(token.access_token);
            
            return next.handle(this.addTokenHeader(request, token.access_token));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.masterService.signOut();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(filter(token => token !== null),take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    console.log(token,'token in addtokenheader')
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }

}





