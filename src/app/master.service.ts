import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor() { }

  isLoggedIn(){
    return localStorage.getItem('userToken') != null;
  }

  storeAccessToken = (token:string) => {
    console.log(token)
    localStorage.setItem('accessToken',token)
  }
  storeRefreshToken = (token:string) => {
    localStorage.setItem('refreshToken',token)
  }
  getAccessToken = () => {
    console.log(localStorage.getItem('accessToken'))
    return localStorage.getItem('accessToken')

  }
  getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
  }
  deleteAccessToken = () => {
    localStorage.removeItem('accessToken')
  }
  deleteRefreshToken = () => {
    localStorage.removeItem('refreshToken')
  }

  
}
