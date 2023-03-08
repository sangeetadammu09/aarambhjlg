import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  CityList: any =[];
  addCityForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddCityBtn') closeaddCityBtn: any;
  @ViewChild('closeeditCityBtn') closeeditCityBtn:any;
  @ViewChild('closeDeleteCityBtn') closeDeleteCityBtn:any;
  addcategoryFile: any;
  editCategoryFile: any;
  addCity:boolean = false;
  editCity:boolean = false;
  editCityForm: FormGroup;
  deleteCityItem: any;
  p = 1;
  productsFound: boolean = false;
  editcategoryPhotoName = "Select File"
  addcategoryPhotoName = "Select File";

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addCityForm = this._formBuilder.group({
      cityId: [],
      cityName: ['', Validators.required],
      registrationFees:[,Validators.required],
     
    })

    this.editCityForm = this._formBuilder.group({
      cityId: [],
      cityName: ['', Validators.required],
      registrationFees:[,Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllCitys()
  }

  get f(){ return this.addCityForm.controls}
  get g(){ return this.editCityForm.controls}


  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
      console.log(data,'all Citys')
     if(data.length > 0){
    //  this.productsFound = true;
       this.CityList = data;
      }else{
        this.CityList = [];
       // this.productsFound = false;
      }
      
    })
  }

  showaddCityModal(){
    this.addCity = true;
    this.editCity = false
    this.submitted = false;
    this.addCityForm.reset();
    this.addCityForm.markAsUntouched();
    this.addCityForm.markAsPristine();
    
  }

  submitNewCity(){
    this.submitted = true;
     if(this.addCityForm.valid){
      //  console.log(this.addCityForm.value)
        var addCityData :any = {};
        addCityData.cityId = 0;
        addCityData.cityName = this.addCityForm.controls['cityName'].value;
        addCityData.registrationFees = this.addCityForm.controls['registrationFees'].value;
       
        this._adminService.addCity(addCityData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('City added successfully!');
            this.closeaddCityBtn.nativeElement.click();
            this.getAllCitys();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  showeditCityModal(item:any){
    console.log(item)
    this.addCity = false;
    this.editCity = true;
    this.editCityForm.patchValue({
      cityId : item.cityId,
      cityName : item.cityName,
      registrationFees : item.registrationFees
    })
    
  }




  
  submitUpdateCity(){
    this.submitted = true;
    console.log(this.editCityForm.value)
   
     if(this.editCityForm.valid){
    
       var updateCityData :any = {};
       updateCityData.cityId = this.editCityForm.controls['cityId'].value;
       updateCityData.cityName = this.editCityForm.controls['cityName'].value;
       updateCityData.registrationFees = this.editCityForm.controls['cityCode'].value;
        this._adminService.updateCity(updateCityData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('City updated successfully!');
            this.closeeditCityBtn.nativeElement.click();
            this.getAllCitys();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteCityModal(item:any){
      this.deleteCityItem = item.categoryId;
  }


  deleteCity(){
      this._adminService.deleteCity(this.deleteCityItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this.getAllCitys();
          this.closeDeleteCityBtn.nativeElement.click();
        }
       
      })
  }

}
