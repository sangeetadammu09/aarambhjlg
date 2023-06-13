import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.css']
})
export class ProductBrandComponent implements OnInit {

  productBrandList: any =[];
  addProductBrandForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddProductBrandBtn') closeaddProductBrandBtn: any;
  @ViewChild('closeeditProductBrandBtn') closeeditProductBrandBtn:any;
  @ViewChild('closeDeleteProductBrandBtn') closeDeleteProductBrandBtn:any;
  addProductBrand:boolean = false;
  editProductBrand:boolean = false;
  editProductBrandForm: FormGroup;
  deleteProductBrandItem: any;
  p = 1;
  productsFound: boolean = false;
  pageLoaded : boolean= false;
  showAddBtn:boolean = true;
  roleNo = localStorage.getItem('roleNo');

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProductBrandForm = this._formBuilder.group({

      brandId: [],
      brandName: ['', Validators.required],
      manufacturer : [,Validators.required],
      description : [,Validators.required]
     
    })

    this.editProductBrandForm = this._formBuilder.group({
      brandId: [],
      brandName: ['', Validators.required],
      manufacturer : [,Validators.required],
      description : [,Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllProductBrands();
    if(this.roleNo == "104" || this.roleNo == "101"){
      this.showAddBtn = false;
    }
  }

  get f(){ return this.addProductBrandForm.controls}
  get g(){ return this.editProductBrandForm.controls}


  getAllProductBrands(){
    this._adminService.getAllProductBrand().subscribe((data) => {
      //console.log(data,'all ProductBrands')
     if(data.length > 0){
      this.pageLoaded = true;
       this.productBrandList = data;
      }else{
        this.productBrandList = [];
        this.pageLoaded = true;
      }
      
    })
  }

  showaddProductBrandModal(){
    this.addProductBrand = true;
    this.editProductBrand = false
    this.submitted = false;
    this.addProductBrandForm.reset();
    this.addProductBrandForm.markAsUntouched();
    this.addProductBrandForm.markAsPristine();
    
  }

  submitNewProductBrand(){
    this.submitted = true;
     if(this.addProductBrandForm.valid){
      //  //console.log(this.addProductBrandForm.value)
        var addProductBrandData :any = {};
        addProductBrandData.brandId = 0;
        addProductBrandData.brandName = this.addProductBrandForm.controls['brandName'].value;
        addProductBrandData.manufacturer = this.addProductBrandForm.controls['manufacturer'].value;
        addProductBrandData.description = this.addProductBrandForm.controls['description'].value;
       
        this._adminService.addProductBrand(addProductBrandData).subscribe((data:any) => {
          //console.log(data.status);
          ////console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Product Brand added successfully!');
            this.closeaddProductBrandBtn.nativeElement.click();
            this.getAllProductBrands();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }



  showeditProductBrandModal(item:any){
    //console.log(item)
    this.addProductBrand = false;
    this.editProductBrand = true;
    
    this.editProductBrandForm.patchValue({
      brandId : item.brandId,
      brandName: item.brandName,
      manufacturer : item.manufacturer,
      description : item.description
    })
    
  }




  
  submitUpdateProductBrand(){
    this.submitted = true;
    //console.log(this.editProductBrandForm.value)
   
     if(this.editProductBrandForm.valid){
    
       var updateProductBrandData :any = {};
       updateProductBrandData.brandId = this.editProductBrandForm.controls['brandId'].value;
       updateProductBrandData.brandName = this.editProductBrandForm.controls['brandName'].value;
       updateProductBrandData.manufacturer = this.editProductBrandForm.controls['manufacturer'].value;
       updateProductBrandData.description = this.editProductBrandForm.controls['description'].value;
        this._adminService.updateProductBrand(updateProductBrandData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product Brand updated successfully!');
            this.closeeditProductBrandBtn.nativeElement.click();
            this.getAllProductBrands();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }


  showdeleteProductBrandModal(item:any){
      this.deleteProductBrandItem = item.brandId;
  }


  deleteProductBrand(){
      this._adminService.deleteProductBrand(this.deleteProductBrandItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('Product Brand deleted successfully!');
          this.getAllProductBrands();
          this.closeDeleteProductBrandBtn.nativeElement.click();
        }
       
      })
  }

}


