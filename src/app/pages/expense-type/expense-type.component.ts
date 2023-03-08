import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-expense-type',
  templateUrl: './expense-type.component.html',
  styleUrls: ['./expense-type.component.css']
})
export class ExpenseTypeComponent implements OnInit {

  expenseTypeList: any =[];
  addExpenseTypeForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddExpenseTypeBtn') closeaddExpenseTypeBtn: any;
  @ViewChild('closeeditExpenseTypeBtn') closeeditExpenseTypeBtn:any;
  @ViewChild('closeDeleteExpenseTypeBtn') closeDeleteExpenseTypeBtn:any;
  addExpenseType:boolean = false;
  editExpenseType:boolean = false;
  editExpenseTypeForm: FormGroup;
  deleteExpenseTypeItem: any;
  p = 1;
  productsFound: boolean = false;


  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addExpenseTypeForm = this._formBuilder.group({
      typeId: [],
      expenseName: ['', Validators.required],
    })

    this.editExpenseTypeForm = this._formBuilder.group({
      typeId: [],
      expenseName: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllExpenseTypes()
  }

  get f(){ return this.addExpenseTypeForm.controls}
  get g(){ return this.editExpenseTypeForm.controls}


  getAllExpenseTypes(){
    this._adminService.getAllExpenseType().subscribe((data) => {
      console.log(data,'all ExpenseTypes')
     if(data.length > 0){
    //  this.productsFound = true;
       this.expenseTypeList = data;
      }else{
        this.expenseTypeList = [];
       // this.productsFound = false;
      }
      
    })
  }

  showaddExpenseTypeModal(){
    this.addExpenseType = true;
    this.editExpenseType = false
    this.submitted = false;
    this.addExpenseTypeForm.reset();
    this.addExpenseTypeForm.markAsUntouched();
    this.addExpenseTypeForm.markAsPristine();
    
  }

  submitNewExpenseType(){
    this.submitted = true;
     if(this.addExpenseTypeForm.valid){
      //  console.log(this.addExpenseTypeForm.value)
        var addExpenseTypeData :any = {};
        addExpenseTypeData.typeId = 0;
        addExpenseTypeData.expenseName = this.addExpenseTypeForm.controls['expenseName'].value;
       
        this._adminService.addExpenseType(addExpenseTypeData).subscribe((data:any) => {
          console.log(data.status);
          //console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Expense Type added successfully!');
            this.closeaddExpenseTypeBtn.nativeElement.click();
            this.getAllExpenseTypes();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }



  showeditExpenseTypeModal(item:any){
    console.log(item)
    this.addExpenseType = false;
    this.editExpenseType = true;
    this.editExpenseTypeForm.patchValue({
      typeId : item.typeId,
      expenseName : item.expenseName
    })
    
  }




  
  submitUpdateExpenseType(){
    this.submitted = true;
   // console.log(this.editExpenseTypeForm.value)
   
     if(this.editExpenseTypeForm.valid){  
       var updateExpenseTypeData :any = {};
       updateExpenseTypeData.typeId = this.editExpenseTypeForm.controls['typeId'].value;
       updateExpenseTypeData.expenseName = this.editExpenseTypeForm.controls['expenseName'].value;
        this._adminService.updateExpenseType(updateExpenseTypeData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Expense Type updated successfully!');
            this.closeeditExpenseTypeBtn.nativeElement.click();
            this.getAllExpenseTypes();
          }
        })
         
      }else{
        console.log('invalid form')
      }  

  }


  showdeleteExpenseTypeModal(item:any){
      this.deleteExpenseTypeItem = item.typeId;
  }


  deleteExpenseType(){
      this._adminService.deleteExpenseType(this.deleteExpenseTypeItem).subscribe((data:any) =>{
        console.log(data)
        if(data.status == 200){
          this._toastrService.success('Expense Type delete successfully!');
          this.getAllExpenseTypes();
          this.closeDeleteExpenseTypeBtn.nativeElement.click();
        }
       
      })
  }

}
