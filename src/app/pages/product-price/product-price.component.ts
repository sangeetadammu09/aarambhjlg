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
  clonedProducts: any;
  totalRecords: any;
  cityId = localStorage.getItem('userCity');
  rowEdit :boolean = false;
  productObj :any;
  searchProductPrice : any;
  pageLoaded : boolean= false;
  isItemAdded : boolean = false;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    

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
    this._adminService.getProducts(this.page,this.pageSize,this.cityId,'').subscribe((data) => {    
      if(data){
        console.log(data)
        this.pageLoaded = true;
        this.productPriceList = data.products;
        this.total = data.pages.totalCount;
        //console.log(this.productPriceList,'all ProductPrices', this.rowEdit)

       }else{
         this.productPriceList = [];
         this.pageLoaded = true;
       }
       
     })
  }

  handlePageChange(event: number){
    this.page = event;
    this.getAllProductPrices();
  }


  getProductPriceVal(event:any){
    //console.log(event.target.value)
    var searchTerm = event.target.value;
    this._adminService.getProducts(this.page,this.pageSize,this.cityId,searchTerm).subscribe((data) => {    
      if(data){
     //  this.productsFound = true;
        this.productPriceList = data.products;
        this.total = data.pages.totalCount;
        //console.log(this.productPriceList,'all ProductPrices', this.rowEdit)

       }else{
         this.productPriceList = [];
        // this.productsFound = false;
       }
       
     })
  }

  getAllCitys(){
    this._adminService.getAllCity().subscribe((data) => {
     // //console.log(data,'all Citys')
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

  onRowEditInit(product: any) {
    this.rowEdit = true;
    
}


  submitNewProductPrice(product: any){
     if(product.productId == undefined){
      this._toastrService.error('Product Name is required');
     }else if(product.reginalName == undefined){
      this._toastrService.error('Regional Name is required');
     }else if(product.mrp == undefined){
      this._toastrService.error('MRP is required');
     }else if(product.jlgSalePrice == undefined){
      this._toastrService.error('JLG Sales Price is required');
     }else if(product.stock == undefined){
      this._toastrService.error('Stock is required');
     }else{
        var addProductPriceData :any = {};
        addProductPriceData.productPriceId = 0;
        addProductPriceData.productId = product.productId;
        addProductPriceData.cityId = this.cityId;
        addProductPriceData.reginalName = product.reginalName;
        addProductPriceData.mrp = product.mrp;
        addProductPriceData.jlgSalePrice = product.jlgSalePrice;
        addProductPriceData.stock = product.stock;
       //console.log(addProductPriceData,'addddddddd')
       this.isItemAdded = true;
        this._adminService.addProductPrice(addProductPriceData).subscribe((data:any) => {
          //console.log(data.status);
      
          if(data.status == 200){
            this._toastrService.success('Product Price added successfully!');
            this.rowEdit = false;
            this.isItemAdded = false;
          //  this.closeaddProductPriceBtn.nativeElement.click();
            this.getAllProductPrices();
          }
        })
         
      }  

  }

  showeditProductPriceModal(item:any){
    //console.log(item)
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
    //console.log(this.editProductPriceForm.value)
   
     if(this.editProductPriceForm.valid){
    
        var updateProductPriceData :any = {};
        updateProductPriceData.productPriceId = this.editProductPriceForm.controls['productPriceId'].value;
        updateProductPriceData.productId = this.editProductPriceForm.controls['productId'].value;
        updateProductPriceData.cityId = this.editProductPriceForm.controls['cityId'].value;
        updateProductPriceData.reginalName = this.editProductPriceForm.controls['reginalName'].value;
        updateProductPriceData.mrp = this.editProductPriceForm.controls['mrp'].value;
        updateProductPriceData.jlgSalePrice = this.editProductPriceForm.controls['jlgSalePrice'].value;
        updateProductPriceData.stock = this.editProductPriceForm.controls['stock'].value;
        this.isItemAdded = true
        this._adminService.updateProductPrice(updateProductPriceData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product Price updated successfully!');
            this.closeeditProductPriceBtn.nativeElement.click();
            this.isItemAdded = false;
            this.getAllProductPrices();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }

  showdeleteProductPriceModal(item:any){
      this.deleteProductPriceItem = item.productPriceId;
  }

  deleteProductPrice(){
    this.isItemAdded = true;
      this._adminService.deleteProductPrice(this.deleteProductPriceItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('Product Price deleted successfully!');
          this.getAllProductPrices();
          this.closeDeleteProductPriceBtn.nativeElement.click();
          this.isItemAdded = false;
        }
       
      })
  }

 



onRowEditCancel(product: any, index: number) {
    this.productPriceList[index] = this.clonedProducts[product.id];
    delete this.productPriceList[product.id];
}

}
