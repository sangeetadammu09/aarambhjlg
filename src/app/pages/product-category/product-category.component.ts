import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  productCategoryList: any;
  addProdCategoryForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('addPhoto') addPhoto!: ElementRef;
  @ViewChild('updatePhoto') updatePhoto!: ElementRef;
  @ViewChild('closeaddProdBtn') closeaddProdBtn: any;
  @ViewChild('closeeditProdBtn') closeeditProdBtn:any;
  @ViewChild('closeDeleteProdBtn') closeDeleteProdBtn:any;
  addcategoryFile: any;
  editCategoryFile: any;
  addProdCategory:boolean = false;
  editProdCategory:boolean = false;
  editProdCategoryForm: FormGroup;
  deleteProdCategoryItem: any;
  p = 1;
  productsFound: boolean = false;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProdCategoryForm = this._formBuilder.group({
      categoryId: [],
      categoryName: ['', Validators.required],
      categoryPhoto:[,Validators.required]
    })

    this.editProdCategoryForm = this._formBuilder.group({
      categoryId: [],
      categoryName: ['', Validators.required],
      categoryPhoto:[,Validators.required]
    })
  }

  ngOnInit(): void {
    this.getAllProductCategories()
  }

  get f(){ return this.addProdCategoryForm.controls}
  get g(){ return this.editProdCategoryForm.controls}


  getAllProductCategories(){
    this._adminService.getAllProductCategory().subscribe((data) => {
      console.log(data,'product category')
     if(data.length > 0){
    //  this.productsFound = true;
       this.productCategoryList = data
      }else{
        this.productCategoryList = [];
       // this.productsFound = false;
      }
      
    })
  }

  showaddProdCategoryModal(){
    this.addProdCategory = true;
    this.editProdCategory = false
  }

  onAddFileChange(file: any) {
    this.addPhoto.nativeElement.innerText = file.target.files[0].name;
    this.addcategoryFile = file.target.files[0];
   
  }


  submitNewProductCategory(){
    this.submitted = true;
     if(this.addProdCategoryForm.valid){
      //  console.log(this.addProdCategoryForm.value)
        var addProductCategoryData = new FormData();
        addProductCategoryData.append('CategoryId',JSON.parse('0'));
        addProductCategoryData.append('CategoryName',this.addProdCategoryForm.controls['categoryName'].value);
        addProductCategoryData.append('CategoryPhoto',this.addcategoryFile);
        this._adminService.addProductCategory(addProductCategoryData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Product Category added successfully!');
            this.closeaddProdBtn.nativeElement.click();
            this.getAllProductCategories();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  showeditProdCategoryModal(item:any){
    console.log(item)
    this.addProdCategory = false;
    this.editProdCategory = true;
    this.editProdCategoryForm.patchValue({
      categoryId : item.categoryId,
      categoryName : item.categoryName,
      //categoryPhoto : item.categoryPhoto
    })
    //this.updatePhoto.nativeElement.innerText =  item.categoryPhoto;
    this.editProdCategoryForm.controls['categoryPhoto'].setValue('helo')
    
  }

  
  onEditFileChange(file: any) {
    this.updatePhoto.nativeElement.innerText = file.target.files[0].name;
    this.editCategoryFile = file.target.files[0];
   
  }


  
  submitUpdateProductCategory(){
    this.submitted = true;
     if(this.editProdCategoryForm.valid){
       console.log(this.editProdCategoryForm.value)
        var addProductCategoryData = new FormData();
        addProductCategoryData.append('CategoryId',this.editProdCategoryForm.controls['categoryId'].value);
        addProductCategoryData.append('CategoryName',this.editProdCategoryForm.controls['categoryName'].value);
        addProductCategoryData.append('CategoryPhoto',this.editCategoryFile);
        this._adminService.updateProductCategory(addProductCategoryData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Product Category updated successfully!');
            this.closeeditProdBtn.nativeElement.click();
            this.getAllProductCategories();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteProdCategoryModal(item:any){
      this.deleteProdCategoryItem = item.categoryId;
  }


  deleteProdCategory(){
      this._adminService.deleteProductCategory(this.deleteProdCategoryItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this.getAllProductCategories();
          this.closeDeleteProdBtn.nativeElement.click();
        }
       
      })
  }

}
