import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList: any =[];
  addProductForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddProductBtn') closeaddProductBtn: any;
  @ViewChild('closeeditProductBtn') closeeditProductBtn:any;
  @ViewChild('closeDeleteProductBtn') closeDeleteProductBtn:any;
  addProduct:boolean = false;
  editProduct:boolean = false;
  editProductForm: FormGroup;
  deleteProductItem: any;
  p = 1;
  productsFound: boolean = false;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      registrationFees:[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
     
    })

    this.editProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      registrationFees:[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
    })
  }

  ngOnInit(): void {
    this.getAllProducts()
  }

  get f(){ return this.addProductForm.controls}
  get g(){ return this.editProductForm.controls}


  getAllProducts(){
    var paginationObj :any ={};
    paginationObj.pageNo =1;
    paginationObj.pageSize = 10;
    this._adminService.getAllProduct(paginationObj.pageNo,paginationObj.pageSize).subscribe((data) => {
      console.log(data,'all Products')
     if(data.length > 0){
    //  this.productsFound = true;
       this.productList = data;
      }else{
        this.productList = [];
       // this.productsFound = false;
      }
      
    })
  }

  showaddProductModal(){
    this.addProduct = true;
    this.editProduct = false
    this.submitted = false;
    this.addProductForm.reset();
    this.addProductForm.markAsUntouched();
    this.addProductForm.markAsPristine();
    
  }

  submitNewProduct(){
    this.submitted = true;
     if(this.addProductForm.valid){
      //  console.log(this.addProductForm.value)
        var addProductData :any = {};
        addProductData.productId = 0;
        addProductData.productName = this.addProductForm.controls['productName'].value;
        addProductData.registrationFees = this.addProductForm.controls['registrationFees'].value;
       
        this._adminService.addProduct(addProductData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Product added successfully!');
            this.closeaddProductBtn.nativeElement.click();
            this.getAllProducts();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  showeditProductModal(item:any){
    console.log(item)
    this.addProduct = false;
    this.editProduct = true;
    this.editProductForm.patchValue({
      productId : item.productId,
      productName : item.productName,
      registrationFees : item.registrationFees
    })
    
  }




  
  submitUpdateProduct(){
    this.submitted = true;
    console.log(this.editProductForm.value)
   
     if(this.editProductForm.valid){
    
       var updateProductData :any = {};
       updateProductData.productId = this.editProductForm.controls['productId'].value;
       updateProductData.productName = this.editProductForm.controls['productName'].value;
       updateProductData.registrationFees = this.editProductForm.controls['registrationFees'].value;
        this._adminService.updateProduct(updateProductData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product updated successfully!');
            this.closeeditProductBtn.nativeElement.click();
            this.getAllProducts();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteProductModal(item:any){
      this.deleteProductItem = item.productId;
  }


  deleteProduct(){
      this._adminService.deleteProduct(this.deleteProductItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Product delete successfully!');
          this.getAllProducts();
          this.closeDeleteProductBtn.nativeElement.click();
        }
       
      })
  }

}

