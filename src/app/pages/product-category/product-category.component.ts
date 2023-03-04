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
  @ViewChild('labelImport') labelImport!: ElementRef;
  @ViewChild('closeaddProdBtn') closeaddProdBtn: any;
  @ViewChild('closeeditProdBtn') closeeditProdBtn:any;
  categoryFile: any;
  addProdCategory:boolean = false;
  editProdCategory:boolean = false;
  editProdCategoryForm: FormGroup;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addProdCategoryForm = this._formBuilder.group({
      categoryId: [],
      categoryName: ['', Validators.required],
      file:[,Validators.required]
    })

    this.editProdCategoryForm = this._formBuilder.group({
      categoryId: [],
      categoryName: ['', Validators.required],
      file:[,Validators.required]
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
      this.productCategoryList = data
    })
  }

  showaddProdCategoryModal(){
    this.addProdCategory = true;
    this.editProdCategory = false
  }

  onFileChange(file: any) {
    this.labelImport.nativeElement.innerText = file.target.files[0].name;
    this.categoryFile = file.target.files[0];
   
  }


  submitNewProductCategory(){
    this.submitted = true;
     if(this.addProdCategoryForm.valid){
      //  console.log(this.addProdCategoryForm.value)
        var addProductCategoryData = new FormData();
        addProductCategoryData.append('CategoryId','');
        addProductCategoryData.append('CategoryName',this.addProdCategoryForm.controls['categoryName'].value);
        addProductCategoryData.append('file',this.categoryFile);
        this._adminService.addProductCategory(addProductCategoryData).subscribe((data:any) => {
          if(data){
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
      categoryName : item.categoryName
    })
  }



  
  submitUpdateProductCategory(){
    this.submitted = true;
     if(this.editProdCategoryForm.valid){
      //  console.log(this.editProdCategoryForm.value)
        var addProductCategoryData = new FormData();
        addProductCategoryData.append('CategoryId','');
        addProductCategoryData.append('CategoryName',this.editProdCategoryForm.controls['categoryName'].value);
        addProductCategoryData.append('file',this.categoryFile);
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

}
