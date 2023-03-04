import { NgModule } from '@angular/core';


export const APP_DI_CONFIG: any = {
  // For api calls
  parentDomain: 'https://jlg.examfirst.in/api',
  endPoints: {
    User:{
      Login : "/User/Login", 
    },
    
  }
  
};

@NgModule({
})
export class AppConfigModules {}