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
  viewMode = 'tab1';
  unitList: any;
  taxSlotList: any;
  todayDate = new Date().toJSON();
  productBrandList: any;
  addedProductId: any;
  showAddBtn:boolean = true;
  roleNo = localStorage.getItem('roleNo');

  productOneImageName: any = "Choose Product";
  disableProdImageOneBtn :boolean = false;
  productImageOneFile: any;

  productTwoImageName: any = "Choose Product";
  disableProdImageTwoBtn :boolean = false;
  productImageTwoFile: any;


  productThreeImageName: any = "Choose Product";
  disableProdImageThreeBtn :boolean = false;
  productImageThreeFile: any;


  productFourImageName: any = "Choose Product";
  disableProdImageFourBtn :boolean = false;
  productImageFourFile: any;


  productFiveImageName: any = "Choose Product";
  disableProdImageFiveBtn :boolean = false;
  productImageFiveFile: any;
  pageLoaded : boolean= false;
 

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      hsnCode: ['', Validators.required],
      catId: [, Validators.required],
      unitId: [, Validators.required],
      brandId:[, Validators.required],
      saleTaxId: [, Validators.required],
      barcode: [],
      description: ['', Validators.required],
      barcodeStatus: [],
      productEngName: ['', Validators.required],
      createdBy: [],
      createdDate: [''],

    })

    this.editProductForm = this._formBuilder.group({
      productId: [],
      productName: ['', Validators.required],
      hsnCode: ['', Validators.required],
      catId: [, Validators.required],
      brandId:[, Validators.required],
      unitId: [, Validators.required],
      saleTaxId: [, Validators.required],
      barcode: [],
      description: ['', Validators.required],
      barcodeStatus: [],
      productEngName: ['', Validators.required],
      createdBy: [],
      createdDate: [''], 
    })

    

  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllProductCategories();
    this.getAllUnits();
    this.getAllTaxSlots();
    this.getAllProductBrands();
    if(this.roleNo == "104" || this.roleNo == "101"){
      this.showAddBtn = false;
    }
  }

  get f(){ return this.addProductForm.controls}
  get g(){ return this.editProductForm.controls}


  getAllProducts(){
    this._adminService.getAllProduct(this.page,this.pageSize).subscribe((data) => {
    //  //console.log(data,'all Products')
     if(data.products.length > 0){
      var productArray = data.products;
      this.productList = productArray
      //.map((item:any, indexNo:any) => ({indexNo, ...item}));
    //  //console.log(this.productList)
       this.total = data.pages.totalCount;
       this.pageLoaded = true;
      }else{
        this.productList = [];
        this.pageLoaded = true;
      }
      
    })
  }

  getAllProductBrands(){
    this._adminService.getAllProductBrand().subscribe((data) => {
     // //console.log(data,'all ProductBrands')
     if(data.length > 0){
    //  this.productsFound = true;
       this.productBrandList = data;
      }else{
        this.productBrandList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllProductCategories(){
    this._adminService.getAllProductCategory().subscribe((data) => {
      ////console.log(data,'product category')
     if(data.length > 0){
       this.productCategoryList = data
      }else{
        this.productCategoryList = [];
      }
      
    })
  }
  
  getAllUnits(){
    this._adminService.getAllUnits().subscribe((data) => {
    //  //console.log(data,'all units')
     if(data.length > 0){
    //  this.productsFound = true;
       this.unitList = data;
      }else{
        this.unitList = [];
       // this.productsFound = false;
      }
      
    })
  }

  getAllTaxSlots(){
    this._adminService.getAllTaxSlot().subscribe((data) => {
     // //console.log(data,'all TaxSlots')
     if(data.length > 0){
    //  this.productsFound = true;
       this.taxSlotList = data;
      }else{
        this.taxSlotList = [];
       // this.productsFound = false;
      }
      
    })
  }

  handlePageChange(event: number){
    ////console.log(event)
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
    this.addProductForm.controls['brandId'].setValue('')
    this.productOneImageName = "Choose Product";
    this.productTwoImageName = "Choose Product";
    this.productThreeImageName = "Choose Product";
    this.productFourImageName = "Choose Product";
    this.productFiveImageName = "Choose Product";
    this.disableProdImageOneBtn= false;
    this.disableProdImageTwoBtn= false;
    this.disableProdImageThreeBtn= false;
    this.disableProdImageFourBtn= false;
    this.disableProdImageFiveBtn= false;
    
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
       //console.log(this.addProductForm.value)
        var addProductData :any = {};
        addProductData.productId = 0;
        addProductData.productName = this.addProductForm.controls['productName'].value;
        addProductData.hsnCode = this.addProductForm.controls['hsnCode'].value;
        addProductData.catId= this.addProductForm.controls['catId'].value;
        addProductData.unitId = this.addProductForm.controls['unitId'].value;
        addProductData.brandId = this.addProductForm.controls['brandId'].value;
        addProductData.saleTaxId = this.addProductForm.controls['saleTaxId'].value;
        addProductData.barcode = this.addProductForm.controls['barcode'].value;
        addProductData.description = this.addProductForm.controls['description'].value;
        addProductData.barcodeStatus = this.addProductForm.controls['barcode'].value == null ? 0 : 1;
        addProductData.productEngName = this.addProductForm.controls['productEngName'].value;
        addProductData.createdBy = this.addProductForm.controls['createdBy'].value;
        addProductData.createdDate = this.todayDate;
        

        this._adminService.addProduct(addProductData).subscribe((data:any) => {
          //console.log(data.status);
          ////console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this.addedProductId = data.body;
            this._toastrService.success('Product added successfully!');
           // this.closeaddProductBtn.nativeElement.click();
            this.viewMode = 'tab2';
            this.getAllProducts();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }

  showeditProductModal(item:any){
    console.log(item)
    this.addProductTitle = "Edit Product"
    this.addProduct = false;
    this.editProduct = true;
    this.editProductForm.patchValue({    
      productId: item.productId,
      productName: item.productName,
      hsnCode: item.hsnCode,
      catId: item.catId,
      unitId: item.unitId,
      saleTaxId: item.saleTaxId,
      brandId: item.brandId,
      barcode: item.barcode,
      description: item.description,
      barcodeStatus: item.barcodeStatus,
      productEngName: item.productEngName,
      createdBy: item.createdBy,
      createdDate: item.createdDate
    })
    
  }

  
  submitUpdateProduct(){
    this.submitted = true;
    //console.log(this.editProductForm.value)
   
     if(this.editProductForm.valid){
    
       var updateProductData :any = {};
       updateProductData.productId = 0;
        updateProductData.productName = this.editProductForm.controls['productName'].value;
        updateProductData.hsnCode = this.editProductForm.controls['hsnCode'].value;
        updateProductData.catId= this.editProductForm.controls['catId'].value;
        updateProductData.unitId = this.editProductForm.controls['unitId'].value;
        updateProductData.saleTaxId = this.editProductForm.controls['saleTaxId'].value;
        updateProductData.brandId = this.editProductForm.controls['brandId'].value;
        updateProductData.barcode = this.editProductForm.controls['barcode'].value;
        updateProductData.description = this.editProductForm.controls['description'].value;
        updateProductData.barcodeStatus = this.editProductForm.controls['barcode'].value;
        updateProductData.productEngName = this.editProductForm.controls['productEngName'].value;
        updateProductData.createdBy = this.editProductForm.controls['createdBy'].value == null ? 0 : this.editProductForm.controls['createdBy'].value;
        updateProductData.createdDate =  this.editProductForm.controls['createdDate'].value;;
      
        this._adminService.updateProduct(updateProductData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product updated successfully!');
            this.closeeditProductBtn.nativeElement.click();
            this.getAllProducts();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }


  showdeleteProductModal(item:any){
      this.deleteProductItem = item.productId;
  }


  deleteProduct(){
      this._adminService.deleteProduct(this.deleteProductItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('Product delete successfully!');
          this.getAllProducts();
          this.closeDeleteProductBtn.nativeElement.click();
        }
       
      })
  }


  uploadProductImageOne(file: any) {
    this.productImageOneFile='';
    this.productOneImageName = file.target.files[0].name;
    if(this.productOneImageName.includes('.png') || this.productOneImageName.includes('.jpg')) {
      this.productImageOneFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitProdImageOne(){
    //console.log('submitProdImages',this.productImageOneFile)
    if(this.productImageOneFile != undefined){
      if(this.addedProductId){
        var addProductImageData = new FormData();
        var photoid :any = 0;
        addProductImageData.append('PhotoId',photoid);
        addProductImageData.append('ProductId',this.addedProductId);
        addProductImageData.append('ProductPhoto',this.productImageOneFile);    
 
        this._adminService.addProductImages(addProductImageData).subscribe((data:any) => {
          if(data.status == 200){     
            this._toastrService.success('Product Image added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableProdImageOneBtn = true;
           this.getAllProducts();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Product Image');
         }
        }
        )
         
      }else{
        this._toastrService.error('No product found');
      }
   }else{
    this._toastrService.error('Please upload Product Image');
  }
  }


  uploadProductImageTwo(file: any) {
    this.productImageTwoFile='';
    this.productTwoImageName = file.target.files[0].name;
    if(this.productTwoImageName.includes('.png') || this.productTwoImageName.includes('.jpg')) {
      this.productImageTwoFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitProdImageTwo(){
    //console.log('submitProdImages',this.productImageTwoFile)
    if(this.productImageTwoFile != undefined){
      if(this.addedProductId){
        var addProductImageData = new FormData();
        var photoid :any = 0;
        addProductImageData.append('PhotoId',photoid);
        addProductImageData.append('ProductId',this.addedProductId);
        addProductImageData.append('ProductPhoto',this.productImageTwoFile);    
 
        this._adminService.addProductImages(addProductImageData).subscribe((data:any) => {
          if(data.status == 200){     
            this._toastrService.success('Product Image added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableProdImageTwoBtn = true;
           this.getAllProducts();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Product Image');
         }
        }
        )
         
      }else{
        this._toastrService.error('No product found');
      }
   }else{
    this._toastrService.error('Please upload Product Image');
  }
  }

  uploadProductImageThree(file: any) {
    this.productImageThreeFile='';
    this.productThreeImageName = file.target.files[0].name;
    if(this.productThreeImageName.includes('.png') || this.productThreeImageName.includes('.jpg')) {
      this.productImageThreeFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitProdImageThree(){
    //console.log('submitProdImages',this.productImageThreeFile)
    if(this.productImageThreeFile != undefined){
      if(this.addedProductId){
        var addProductImageData = new FormData();
        var photoid :any = 0;
        addProductImageData.append('PhotoId',photoid);
        addProductImageData.append('ProductId',this.addedProductId);
        addProductImageData.append('ProductPhoto',this.productImageThreeFile);    
 
        this._adminService.addProductImages(addProductImageData).subscribe((data:any) => {
          if(data.status == 200){     
            this._toastrService.success('Product Image added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableProdImageThreeBtn = true;
           this.getAllProducts();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Product Image');
         }
        }
        )
         
      }else{
        this._toastrService.error('No product found');
      }
   }else{
    this._toastrService.error('Please upload Product Image');
  }
  }


  uploadProductImageFour(file: any) {
    this.productImageFourFile='';
    this.productFourImageName = file.target.files[0].name;
    if(this.productFourImageName.includes('.png') || this.productFourImageName.includes('.jpg')) {
      this.productImageFourFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitProdImageFour(){
   // //console.log('submitProdImages',this.productImageFourFile)
    if(this.productImageFourFile != undefined){
      if(this.addedProductId){
        var addProductImageData = new FormData();
        var photoid :any = 0;
        addProductImageData.append('PhotoId',photoid);
        addProductImageData.append('ProductId',this.addedProductId);
        addProductImageData.append('ProductPhoto',this.productImageFourFile);    
 
        this._adminService.addProductImages(addProductImageData).subscribe((data:any) => {
          if(data.status == 200){     
            this._toastrService.success('Product Image added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableProdImageFourBtn = true;
           this.getAllProducts();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Product Image');
         }
        }
        )
         
      }else{
        this._toastrService.error('No product found');
      }
   }else{
    this._toastrService.error('Please upload Product Image');
  }
  }


  uploadProductImageFive(file: any) {
    this.productImageFiveFile='';
    this.productFiveImageName = file.target.files[0].name;
    if(this.productFiveImageName.includes('.png') || this.productFiveImageName.includes('.jpg')) {
      this.productImageFiveFile = file.target.files[0];
    }else{
      this._toastrService.error('Only PNG or JPG document is allowed')
    }
  }

  submitProdImageFive(){
    //console.log('submitProdImages',this.productImageFiveFile)
    if(this.productImageFiveFile != undefined){
      if(this.addedProductId){
        var addProductImageData = new FormData();
        var photoid :any = 0;
        addProductImageData.append('PhotoId',photoid);
        addProductImageData.append('ProductId',this.addedProductId);
        addProductImageData.append('ProductPhoto',this.productImageFiveFile);    
 
        this._adminService.addProductImages(addProductImageData).subscribe((data:any) => {
          if(data.status == 200){     
            this._toastrService.success('Product Image added successfully!');
          // this.closeaddUserBtn.nativeElement.click();
            this.disableProdImageFiveBtn = true;
           this.getAllProducts();
          } 
        }
        ,(error:any) => {
         if(error.status == 500){
         this._toastrService.error('Please upload Product Image');
         }
        }
        )
         
      }else{
        this._toastrService.error('No product found');
      }
   }else{
    this._toastrService.error('Please upload Product Image');
  }
  }

}

