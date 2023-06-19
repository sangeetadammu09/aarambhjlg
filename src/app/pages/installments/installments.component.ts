import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-installments',
  templateUrl: './installments.component.html',
  styleUrls: ['./installments.component.css']
})
export class InstallmentsComponent implements OnInit {

  installmentList: any =[];
  addInstallmentForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddInstallmentBtn') closeaddInstallmentBtn: any;
  @ViewChild('closeeditInstallmentBtn') closeeditInstallmentBtn:any;
  @ViewChild('closeDeleteInstallmentBtn') closeDeleteInstallmentBtn:any;
  addInstallment:boolean = false;
  editInstallment:boolean = false;
  editInstallmentForm: FormGroup;
  deleteInstallmentItem: any;
  p = 1;
  pageLoaded: boolean = false;
  showAddBtn: boolean = true;
  roleNo = localStorage.getItem('roleNo');
  isItemAdded: boolean = false;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addInstallmentForm = this._formBuilder.group({
      id: [],
      installment: ['', Validators.required],
      installmentNo:[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
     
    })

    this.editInstallmentForm = this._formBuilder.group({
      id: [],
      installment: ['', Validators.required],
      installmentNo:[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
    })
  }

  ngOnInit(): void {
    this.getAllInstallments();
    if(this.roleNo == "104" || this.roleNo == "101"){
      this.showAddBtn = false;
      
    }
  }

  get f(){ return this.addInstallmentForm.controls}
  get g(){ return this.editInstallmentForm.controls}


  getAllInstallments(){
    this._adminService.getAllInstallment().subscribe((data) => {
      //console.log(data,'all Installments')
     if(data.length > 0){
       this.pageLoaded = true
       this.installmentList = data;
      }else{
        this.installmentList = [];
        this.pageLoaded = true;
      }
      
    })
  }

  showaddInstallmentModal(){
    this.addInstallment = true;
    this.editInstallment = false
    this.submitted = false;
    this.addInstallmentForm.reset();
    this.addInstallmentForm.markAsUntouched();
    this.addInstallmentForm.markAsPristine();
   
    
  }

  submitNewInstallment(){
    this.submitted = true;
     if(this.addInstallmentForm.valid){
      //  //console.log(this.addInstallmentForm.value)
      this.isItemAdded = true;
        var addInstallmentData :any = {};
        addInstallmentData.id = 0;
        addInstallmentData.installment = this.addInstallmentForm.controls['installment'].value;
        addInstallmentData.installmentNo = this.addInstallmentForm.controls['installmentNo'].value;
       
        this._adminService.addInstallment(addInstallmentData).subscribe((data:any) => {
          //console.log(data.status);
          ////console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('Installment added successfully!');
            this.closeaddInstallmentBtn.nativeElement.click();
            this.isItemAdded = false;
            this.getAllInstallments();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }



  showeditInstallmentModal(item:any){
    //console.log(item)
    this.addInstallment = false;
    this.editInstallment = true;
    this.editInstallmentForm.patchValue({
      id : item.id,
      installment: item.installment,
      installmentNo : item.installmentNo
    })
    
  }




  
  submitUpdateInstallment(){
    this.submitted = true;
    //console.log(this.editInstallmentForm.value)
   
     if(this.editInstallmentForm.valid){
       this.isItemAdded = true;
       var updateInstallmentData :any = {};
       updateInstallmentData.id = this.editInstallmentForm.controls['id'].value;
       updateInstallmentData.installment = this.editInstallmentForm.controls['installment'].value;
       updateInstallmentData.installmentNo = this.editInstallmentForm.controls['installmentNo'].value;
        this._adminService.updateInstallment(updateInstallmentData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('Installment updated successfully!');
            this.closeeditInstallmentBtn.nativeElement.click();
            this.isItemAdded = false;
            this.getAllInstallments();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }


  showdeleteInstallmentModal(item:any){
      this.deleteInstallmentItem = item.id;
  }


  deleteInstallment(){
    this.isItemAdded = true;
      this._adminService.deleteInstallment(this.deleteInstallmentItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('Installment deleted successfully!');
          this.isItemAdded = false;
          this.getAllInstallments();
          this.closeDeleteInstallmentBtn.nativeElement.click();
        }
       
      })
  }

}

