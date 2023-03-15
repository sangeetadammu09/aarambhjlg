import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-product-price',
  templateUrl: './product-price.component.html',
  styleUrls: ['./product-price.component.css']
})
export class ProductPriceComponent implements OnInit {
  productPriceList: any =[];
  addProductPriceForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddProductPriceBtn') closeaddProductPriceBtn: any;
  @ViewChild('closeeditProductPriceBtn') closeeditProductPriceBtn:any;
  @ViewChild('closeDeleteProductPriceBtn') closeDeleteProductPriceBtn:any;
  addProductPrice:boolean = false;
  editProductPrice:boolean = false;
  editProductPriceForm: FormGroup;
  deleteProductPriceItem: any;
  page = 1;
  total = 20;
  pageSize = 10;
  productCityId = localStorage.getItem('userCity');
  productsFound: boolean = false;
  cityList: any;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProductPriceForm = this._formBuilder.group({
      productPriceId: [],
      productId: [, Validators.required],
      cityId: [, Validators.required],
      reginalName:  ['', Validators.required] ,
      mrp:  [, Validators.required],
      jlgSalePrice:  [, Validators.required],
      stock:  [, Validators.required]
     
    })

    this.editProductPriceForm = this._formBuilder.group({
      productPriceId: [],
      productId: [, Validators.required],
      cityId: [, Validators.required],
      reginalName:  ['', Validators.required] ,
      mrp:  [, Validators.required],
      jlgSalePrice:  [, Validators.required],
      stock:  [, Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllProductPrices();
    this.getAllCitys();
  }

  get f(){ return this.addProductPriceForm.controls}
  get g(){ return this.editProductPriceForm.controls}


  getAllProductPrices(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    this._adminService.getAllProductPrice(this.page,this.pageSize,this.productCityId).subscribe((data) => {
      console.log(data,'all ProductPrices')
     if(data.length > 0){
    //  this.productsFound = true;
       this.productPriceList = data;
      }else{
        this.productPriceList = [];
       // this.productsFound = false;
      }
      
    })
  }

  handlePageChange(event: number){
    //console.log(event)
    this.page = event;
    this.getAllProductPrices();
}

getAllCitys(){
  this._adminService.getAllCity().subscribe((data) => {
    console.log(data,'all Citys')
   if(data.length > 0){
  //  this.productsFound = true;
     this.cityList = data;
    }else{
      this.cityList = [];
     // this.productsFound = false;
    }
    
  })
}


  showaddProductPriceModal(){
    this.addProductPrice = true;
    this.editProductPrice = false
    this.submitted = false;
    this.addProductPriceForm.reset();
    this.addProductPriceForm.markAsUntouched();
    this.addProductPriceForm.markAsPristine();
    this.addProductPriceForm.controls['cityId'].setValue('')
    
  }

  submitNewProductPrice(){
    this.submitted = true;
     if(this.addProductPriceForm.valid){
      //  console.log(this.addProductPriceForm.value)
        var addProductPriceData :any = {};
        addProductPriceData.productPriceId = 0;
        addProductPriceData.productId = this.addProductPriceForm.controls['productId'].value;
        addProductPriceData.cityId = this.addProductPriceForm.controls['cityId'].value;
        addProductPriceData.reginalName = this.addProductPriceForm.controls['reginalName'].value;
        addProductPriceData.mrp = this.addProductPriceForm.controls['mrp'].value;
        addProductPriceData.jlgSalePrice = this.addProductPriceForm.controls['jlgSalePrice'].value;
        addProductPriceData.stock = this.addProductPriceForm.controls['stock'].value;
       
        this._adminService.addProductPrice(addProductPriceData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Product Price added successfully!');
            this.closeaddProductPriceBtn.nativeElement.click();
            this.getAllProductPrices();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  showeditProductPriceModal(item:any){
    console.log(item)
    this.addProductPrice = false;
    this.editProductPrice = true;
    this.editProductPriceForm.patchValue({
      cityId : item.cityId,
      cityName : item.cityName,
      registrationFees : item.registrationFees
    })
    
  }




  
  submitUpdateProductPrice(){
    this.submitted = true;
    console.log(this.editProductPriceForm.value)
   
     if(this.editProductPriceForm.valid){
    
        var updateProductPriceData :any = {};
        updateProductPriceData.productPriceId = this.editProductPriceForm.controls['productPriceId'].value;
        updateProductPriceData.productId = this.editProductPriceForm.controls['productId'].value;
        updateProductPriceData.cityId = this.editProductPriceForm.controls['cityId'].value;
        updateProductPriceData.reginalName = this.editProductPriceForm.controls['reginalName'].value;
        updateProductPriceData.mrp = this.editProductPriceForm.controls['mrp'].value;
        updateProductPriceData.jlgSalePrice = this.editProductPriceForm.controls['jlgSalePrice'].value;
        updateProductPriceData.stock = this.editProductPriceForm.controls['stock'].value;
        this._adminService.updateProductPrice(updateProductPriceData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product Price updated successfully!');
            this.closeeditProductPriceBtn.nativeElement.click();
            this.getAllProductPrices();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteProductPriceModal(item:any){
      this.deleteProductPriceItem = item.productPriceId;
  }


  deleteProductPrice(){
      this._adminService.deleteProductPrice(this.deleteProductPriceItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Product Price deleted successfully!');
          this.getAllProductPrices();
          this.closeDeleteProductPriceBtn.nativeElement.click();
        }
       
      })
  }

}
