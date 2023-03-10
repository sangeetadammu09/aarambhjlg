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
  productsFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  productCategoryList: any;
  addProductTitle ="Add Product";
 

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      hsnCode: ['', Validators.required],
      catId: [, Validators.required],
      unitId: [, Validators.required],
      saleTaxId: [, Validators.required],
      barcode: ['', Validators.required],
      description: ['', Validators.required],
      purchaseTaxId: [, Validators.required],
      discountId: [, Validators.required],
      barcodeStatus: ['', Validators.required],
      productEnglishName: ['', Validators.required],
      isDiscountApplicable: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
      updatedBy: ['', Validators.required],
      updatedDate: ['', Validators.required],
      mfd: ['', Validators.required],
      expiryDate: ['', Validators.required],
      batchNo: ['', Validators.required]     
    })

    this.editProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      hsnCode: ['', Validators.required],
      catId: [, Validators.required],
      unitId: [, Validators.required],
      saleTaxId: [, Validators.required],
      barcode: ['', Validators.required],
      description: ['', Validators.required],
      purchaseTaxId: [, Validators.required],
      discountId: [, Validators.required],
      barcodeStatus: ['', Validators.required],
      productEnglishName: ['', Validators.required],
      isDiscountApplicable: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdDate: ['', Validators.required],
      updatedBy: ['', Validators.required],
      updatedDate: ['', Validators.required],
      mfd: ['', Validators.required],
      expiryDate: ['', Validators.required],
      batchNo: ['', Validators.required]     
    })

    

  }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllProductCategories()
  }

  get f(){ return this.addProductForm.controls}
  get g(){ return this.editProductForm.controls}


  getAllProducts(){
    var paginationObj :any ={};
    paginationObj.pageNo =this.page;
    paginationObj.pageSize = this.pageSize;
    this._adminService.getAllProduct(paginationObj.pageNo,paginationObj.pageSize).subscribe((data) => {
      console.log(data,'all Products')
     if(data.length > 0){
    //  this.productsFound = true;
       this.productList = data;
       //this.total = data.total;
      }else{
        this.productList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllProductCategories(){
    this._adminService.getAllProductCategory().subscribe((data) => {
      console.log(data,'product category')
     if(data.length > 0){
       this.productCategoryList = data
      }else{
        this.productCategoryList = [];
      }
      
    })
  }

  handlePageChange(event: number){
    console.log(event)
    this.page = event;
    this.getAllProducts();
}

  showaddProductModal(){
    this.submitted = false;
    this.addProductForm.reset();
    this.addProductForm.markAsUntouched();
    this.addProductForm.markAsPristine();
    this.addProductForm.controls['catId'].setValue('')
    this.addProductForm.controls['unitId'].setValue('')
    this.addProductForm.controls['saleTaxId'].setValue('')
    this.addProductForm.controls['purchaseTaxId'].setValue('')
    
  }

  addProdTab(){
    this.addProductTitle ="Add Product";
  }

  uploadProdImages(){
    this.addProductTitle ="Upload Product Images";
  }

 
  submitNewProduct(){
    this.submitted = true;
     if(this.addProductForm.valid){
      //  console.log(this.addProductForm.value)
        var addProductData :any = {};
        addProductData.productId = 0;
        addProductData.productName = this.addProductForm.controls['productName'].value;
        addProductData.hsnCode = this.addProductForm.controls['hsnCode'].value;
        addProductData.catId= this.addProductForm.controls['catId'].value;
        addProductData.unitId = this.addProductForm.controls['unitId'].value;
        addProductData.saleTaxId = this.addProductForm.controls['saleTaxId'].value;
        addProductData.barcode = this.addProductForm.controls['barcode'].value;
        addProductData.description = this.addProductForm.controls['description'].value;
        addProductData.purchaseTaxId = this.addProductForm.controls['purchaseTaxId'].value;
        addProductData.discountId = this.addProductForm.controls['discountId'].value;
        addProductData.barcodeStatus = this.addProductForm.controls['barcodeStatus'].value;
        addProductData.productEnglishName = this.addProductForm.controls['productEnglishName'].value;
        addProductData.isDiscountApplicable = this.addProductForm.controls['isDiscountApplicable'].value;
        addProductData.createdBy = this.addProductForm.controls['createdBy'].value;
        addProductData.createdDate = this.addProductForm.controls['createdDate'].value;
        addProductData.updatedBy = this.addProductForm.controls['updatedBy'].value;
        addProductData.updatedDate = this.addProductForm.controls['updatedDate'].value;
        addProductData.mfd = this.addProductForm.controls['mfd'].value;
        addProductData.expiryDate = this.addProductForm.controls['expiryDate'].value;
        addProductData.batchNo = "";

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
      productId: item.productId,
      productName: item.productName,
      hsnCode: item.hsnCode,
      catId: item.catId,
      unitId: item.unitId,
      saleTaxId: item.saleTaxId,
      barcode: item.barcode,
      description: item.description,
      purchaseTaxId: item.purchaseTaxId,
      discountId: item.discountId,
      barcodeStatus: item.barcodeStatus,
      productEnglishName: item.productEnglishName,
      isDiscountApplicable: item.isDiscountApplicable,
      createdBy: item.createdBy,
      createdDate: item.createdDate,
      updatedBy: item.updatedBy,
      updatedDate: item.updatedDate,
      mfd: item.mfd,
      expiryDate: item.expiryDate,
      batchNo: item.batchNo,     
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

