import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';

@Component({
  selector: 'app-tax-slot',
  templateUrl: './tax-slot.component.html',
  styleUrls: ['./tax-slot.component.css']
})
export class TaxSlotComponent implements OnInit {

  TaxSlotList: any =[];
  addTaxSlotForm!: FormGroup;
  submitted: boolean = false;
  @ViewChild('closeaddTaxSlotBtn') closeaddTaxSlotBtn: any;
  @ViewChild('closeeditTaxSlotBtn') closeeditTaxSlotBtn:any;
  @ViewChild('closeDeleteTaxSlotBtn') closeDeleteTaxSlotBtn:any;
  addTaxSlot:boolean = false;
  editTaxSlot:boolean = false;
  editTaxSlotForm: FormGroup;
  deleteTaxSlotItem: any;
  p = 1;
  productsFound: boolean = false;
  pageLoaded : boolean= false;
  roleNo = localStorage.getItem('roleNo');
  showAddBtn: boolean = true;

  constructor(private _adminService: AdminService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addTaxSlotForm = this._formBuilder.group({
      taxId: [],
      taxName: ['', Validators.required],
      cgstPercent : [,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      sgstPercent : [,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      totalTaxPercent :[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      createdBy : [],
      updatedBy : [],

    })

    this.editTaxSlotForm = this._formBuilder.group({
      taxId: [],
      taxName: ['', Validators.required],
      cgstPercent : [,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      sgstPercent : [,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      totalTaxPercent :[,[Validators.required,  Validators.pattern("^[0-9]*$"),]],
      createdBy : [],
      updatedBy : [],
    })
  }

  ngOnInit(): void {
    this.getAllTaxSlots();
    if(this.roleNo == "104" || this.roleNo == "101"){
      this.showAddBtn = false;
      
    }
  }

  get f(){ return this.addTaxSlotForm.controls}
  get g(){ return this.editTaxSlotForm.controls}


  getAllTaxSlots(){
    this._adminService.getAllTaxSlot().subscribe((data) => {
      //console.log(data,'all TaxSlots')
     if(data.length > 0){
      this.pageLoaded = true;
       this.TaxSlotList = data;
      }else{
        this.TaxSlotList = [];
        this.pageLoaded = true;
      }
      
    })
  }

  showaddTaxSlotModal(){
    this.addTaxSlot = true;
    this.editTaxSlot = false
    this.submitted = false;
    this.addTaxSlotForm.reset();
    this.addTaxSlotForm.markAsUntouched();
    this.addTaxSlotForm.markAsPristine();
    
  }

  submitNewTaxSlot(){
    this.submitted = true;
     if(this.addTaxSlotForm.valid){
      //  //console.log(this.addTaxSlotForm.value)
        var addTaxSlotData :any = {};
        addTaxSlotData.taxId = 0;
        addTaxSlotData.taxName = this.addTaxSlotForm.controls['taxName'].value;
        addTaxSlotData.cgstPercent = this.addTaxSlotForm.controls['cgstPercent'].value;
        addTaxSlotData.sgstPercent = this.addTaxSlotForm.controls['sgstPercent'].value;
        addTaxSlotData.totalTaxPercent = this.addTaxSlotForm.controls['totalTaxPercent'].value;
        addTaxSlotData.createdBy = '0';
        addTaxSlotData.updatedBy = '0';
        this._adminService.addTaxSlot(addTaxSlotData).subscribe((data:any) => {
          //console.log(data.status);
          ////console.log(data.headers.get('X-Custom-Header'));
          if(data.status == 200){
            this._toastrService.success('TaxSlot added successfully!');
            this.closeaddTaxSlotBtn.nativeElement.click();
            this.getAllTaxSlots();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }



  showeditTaxSlotModal(item:any){
    //console.log(item)
    this.addTaxSlot = false;
    this.editTaxSlot = true;
    this.editTaxSlotForm.patchValue({
      taxId : item.taxId,
      taxName : item.taxName,
      cgstPercent : item.cgstPercent,
      sgstPercent : item.sgstPercent,
      totalTaxPercent : item.totalTaxPercent
    })
    
  }




  
  submitUpdateTaxSlot(){
    this.submitted = true;
    //console.log(this.editTaxSlotForm.value)
   
     if(this.editTaxSlotForm.valid){
    
       var updateTaxSlotData :any = {};
       updateTaxSlotData.taxId = this.editTaxSlotForm.controls['taxId'].value;
       updateTaxSlotData.cgstPercent = this.editTaxSlotForm.controls['cgstPercent'].value;
       updateTaxSlotData.sgstPercent = this.editTaxSlotForm.controls['sgstPercent'].value;
       updateTaxSlotData.totalTaxPercent = this.editTaxSlotForm.controls['totalTaxPercent'].value;
       updateTaxSlotData.createdBy = this.editTaxSlotForm.controls['createdBy'].value;
       updateTaxSlotData.updatedBy = this.editTaxSlotForm.controls['updatedBy'].value;
        this._adminService.updateTaxSlot(updateTaxSlotData).subscribe((data:any) => {
          if(data){
            this._toastrService.success('TaxSlot updated successfully!');
            this.closeeditTaxSlotBtn.nativeElement.click();
            this.getAllTaxSlots();
          }
        })
         
      }else{
        //console.log('invalid form')
      }  

  }


  showdeleteTaxSlotModal(item:any){
      this.deleteTaxSlotItem = item.taxId;
  }


  deleteTaxSlot(){
      this._adminService.deleteTaxSlot(this.deleteTaxSlotItem).subscribe((data:any) =>{
        //console.log(data)
        if(data.status == 200){
          this._toastrService.success('TaxSlot delete successfully!');
          this.getAllTaxSlots();
          this.closeDeleteTaxSlotBtn.nativeElement.click();
        }
       
      })
  }

}

