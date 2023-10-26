import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin/service/admin.service';
import { SalesRelationService } from 'src/app/sales-relation-officer/service/sales-relation.service';
import { DataService } from 'src/app/utils/data.service';


declare var $: any;
@Component({
  selector: 'app-neworder',
  templateUrl: './neworder.component.html',
  styleUrls: ['./neworder.component.css']
})

export class NeworderComponent implements OnInit {

  randomProductList: any = [];
  MembersFound: boolean = false;
  page = 1;
  total = 20;
  pageSize = 10;
  cityId = localStorage.getItem('userCity');
  userId = localStorage.getItem('userId');
  roleNo = localStorage.getItem('roleNo');
  roles = localStorage.getItem('roles');
  memberDropdownList: any = [];
  centerDropdownList: any = []
  searchMember: any;
  searchProduct: any;
  searchCenter: any;
  productList: any = [];
  todayDate = new Date().toJSON();
  selectedCartId: any;
  exampleData: any = [];
  suggestions: string[] = [];
  itemsAdded: boolean = false;
  cartText = "Add To Cart";
  isselectedProduct: boolean = true;
  @ViewChild('closeproductModalBtn') closeproductModalBtn: any;
  @ViewChild('closeViewCartModalBtn') closeViewCartModalBtn: any;
  @ViewChild('closeMemberValidityBtn') closeMemberValidityBtn: any;
  @ViewChild('openModal') openModal: any;
  searchProductItem: any = {};
  searchBranch: any;
  productObj: any = {};
  memberId: any;
  cartDetailsObj: any = {}
  cartList: any = [];
  branchDropdownList: any = [];
  firstRole: any;
  newCart: any = {};
  createdCart: any;
  oldCartData: any;
  pageLoaded: boolean = false;
  salesPriceZero: boolean = false;
  isMemberValidityExpired: boolean = false;
  notEligibleTxt: any;




  constructor(private _salesService: SalesRelationService, private toastrService: ToastrService,
    private router: Router, private dataService: DataService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.getSalesOfficersCenterList();
    this.searchMember = "";
    this.searchCenter = "";
    this.searchProduct = "";
    this.searchBranch = "";
    this.getRandomProductList();
    this.productObj = {
      prodQuantityInput: "",

    };

    if (this.roles) {
      var temp = JSON.parse(this.roles);
      const finalArray = temp.map((item: any, index: number) => ({ id: index, name: item }))
      this.firstRole = finalArray[0].name;
      //console.log(this.firstRole);
    }

    this.getAllBranchesByCityId();



  }

  getSalesOfficersCenterList() {
    this._salesService.getSalesOfficersCenterList(this.userId, this.cityId).subscribe((data: any) => {
      ////console.log(data,'cco member')
      if (data.length > 0) {
        this.centerDropdownList = data;
        this.pageLoaded = true;

      } else {
        this.centerDropdownList = [];
        this.pageLoaded = true;
      }
    })

  }

  getAllBranchesByCityId() {
    this.adminService.getBranchesByCityId(this.cityId).subscribe((data: any) => {
      console.log(data, 'all getBranchesByCityId')
      if (data.length > 0) {
        this.branchDropdownList = data;

      } else {
        this.branchDropdownList = [];
      }
    })

  }

  getCenterVal(event: any) {
    var searchMemberId = event;
    this._salesService.getMemberListByCenter(searchMemberId).subscribe((data: any) => {
      // //console.log(data,'all memberDropdownList')
      if (data.length > 0) {
        this.memberDropdownList = data;

        //  this.total = data.page.totalCount;

      } else {
        this.memberDropdownList = [];
      }
    })

  }

  getSearchedProducts(event: any) {
    var searchProd = event;
    if (searchProd.length > 0) {
      this._salesService.getProductAutocomplete(searchProd).subscribe((data: any) => {
        //   //console.log(data,'all productList')
        if (data.length > 0) {
          //this.searchProduct = ''
          this.productList = data;

        } else {
          this.productList = [];

        }
      })
    } else {
      this.getRandomProductList();
    }
  }

  listSearchedProduct(item: any) {
    this.searchProduct = item.productName;
    var selectproductId = item.productId;
    this._salesService.getSingleProducts(this.cityId, selectproductId).subscribe((data: any) => {

      if (data) {
        this.randomProductList = [data, ...[]]


      } else {
        this.toastrService.error('No Product Found')
      }
    })
  }


  getRandomProductList() {
    this._salesService.getRandomProducts(this.cityId).subscribe((data: any) => {
      if (data.length > 0) {
        this.randomProductList = data;
        this.dataService.oldCartData.subscribe((data: any) => {
          this.oldCartData = data;
          if (this.oldCartData) {
            //console.log(this.oldCartData.cartItems);
            this.searchCenter = this.oldCartData.centerId;
            this.getCenterVal(this.searchCenter)
            this.searchBranch = this.oldCartData.branchId;
            this.searchMember = this.oldCartData.memberId;
            this.selectedCartId = this.oldCartData.cartId;
            this.memberId = this.oldCartData.memberId;
            //console.log(this.randomProductList)
            // this.createNewCart(this.searchMember)

          }

        })

      } else {
        this.randomProductList = [];
      }
    })
  }

  clearText() {
    this.productList = [];
    this.searchProduct = null;
    this.getRandomProductList();
  }

  validateAndCreateCart(memberId: number) {
    this._salesService.getOrderMemberValidity(memberId).subscribe({
      next: (data: any) => {
        if (data.status == 200 && data.body.isEligible) {
          this.isMemberValidityExpired = false;
          this.createNewCart(memberId);
        }
        else {
          this.openModal.nativeElement.click();
          this.isMemberValidityExpired = true;
          this.searchMember = "";
          let reasons = '';

          data.body.failuresReasons.forEach((msg: string) => {
            reasons += msg + '\n';
          });
          this.notEligibleTxt = reasons;
        }
      },
      error: (error: HttpErrorResponse) => {

      }
    })
  }

  closeMemberValidityModal() {
    this.closeMemberValidityBtn.nativeElement.click();
    this.isMemberValidityExpired = false;
  }

  private createNewCart(item: any) {
    this.memberId = item;
    this.newCart.cartId = 0,
      this.newCart.cityId = this.cityId ? JSON.parse(this.cityId) : null,
      this.newCart.centerId = this.searchCenter,
      this.newCart.memberId = item,
      this.newCart.branchId = this.searchBranch,
      this.newCart.orderTakenById = this.userId ? JSON.parse(this.userId) : null,
      this.newCart.orderTakenByRole = this.roleNo == '102' && this.roles ? this.firstRole : null,
      this.newCart.cartDate = this.todayDate
    // //console.log(this.newCart)
    this._salesService.getShoppingCart(this.newCart).subscribe((data: any) => {
      if (data) {
        this.createdCart = data;
        this.selectedCartId = data.cartId;
        this.toastrService.success('Cart created successfully')
      } else {
        this.toastrService.error('No cart created')
      }
    })
  }

  validateQuantity(value: any) {
    this.isselectedProduct = value;

  }

  showProductModal(item: any) {
    this.productObj.prodQuantityInput = null;
    this.searchProductItem = item;
    if (this.oldCartData) {
      let tempCartArr = this.oldCartData.cartItems;
      tempCartArr.forEach((y: any) => {
        if (item.productId == y.itemId) {
          this.productObj.prodQuantityInput = y.qty
        }
      })
    }

    this.itemsAdded = false;
    this.cartText = "Add To Cart";
  }

  addToCart(prodQuantity: any, product: any) {
    if (this.selectedCartId) {
      var addCart: any = {};
      addCart.cartId = this.selectedCartId,
        addCart.itemId = product.productId,
        addCart.itemName = product.productName,
        addCart.qty = JSON.parse(this.productObj.prodQuantityInput),
        addCart.salePrice = product.jlgSalePrice,
        addCart.mrp = product.mrp,
        addCart.subTotal = addCart.salePrice * addCart.qty,
        addCart.itemUrl = product.productPhoto
      console.log(product.jlgSalePrice)
      if (product.jlgSalePrice == 0) {
        this.salesPriceZero = true;
      } else {
        this._salesService.addItemToCart(addCart).subscribe((data: any) => {
          if (data.status == 200) {
            this.toastrService.success('Items added successfully')
            this.itemsAdded = true;
            this.cartText = "Added To Cart"
            this.productObj.prodQuantityInput = null;
            this.closeproductModalBtn.nativeElement.click();
            this.salesPriceZero = false;
          } else {
            this.toastrService.error('No Items added. Please try again')
          }
        })
      }
    } else {
      this.toastrService.error('No Cart Found')
    }

  }

  showViewCartModal() {
    if (this.selectedCartId && this.memberId) {
      if (this.createdCart) {
        this.dataService.sendMemberIdAndCartId(this.createdCart)
      } else {
        this.createdCart = this.oldCartData;
        this.dataService.sendMemberIdAndCartId(this.createdCart)
      }

      this.router.navigate(['/sales-relation-officer/view-cart'])

    }
  }




}
