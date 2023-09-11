import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { ProductList } from '../model/ProductList';
import { Product } from '../model/Product';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CartServiceService } from 'src/app/services/cart-service.service';



@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  noResults: boolean;
  cart: Product[];
  ProductList: Product[] = [];
  ProductListAll: Product[] = []
  Colours: string[] = []
  SubCategory: string[] = []
  ProductType: string[] = []
  Usage: string[] = []

  isSelectVisible = false;
  admin: boolean = false;

  count: number = 0;
  flagSub: boolean = true;
  logged: boolean = false;
  stickyCart: boolean = false;

  isButtonFilterChecked = false;

  searchForm: FormGroup;

  selectedValue: any;


  paramsPag = {
    ordering: "colour",
    gender: "boys",
    p: 1,
    page_size: 12,
    colour: '',
    usage: '',
    subCategory: '',
    productType: '',
    search: '',


  }


  params = {
    ordering: "colour",
    gender: "boys",
    p: 1,
    productType: '',
    subCategory: '',
    colour: '',
    usage: '',

  }

  constructor(private service: ShopServiceService, private fb: FormBuilder, private route: ActivatedRoute, private cartService: CartServiceService, private router: Router) {


    this.cart = []
    this.noResults = false;
    this.searchForm = this.fb.group({
      search: '',
    });

  }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      //get a gender from route
      this.params.gender = params['gender']
      let rb = document.getElementById(params['gender']) as HTMLInputElement;
      rb.checked = true;
      this.paramsPag.gender = params['gender']

    })


    this.refreshProdList();
    this.ProdOptions();
    this.checkIsAdmin();


  }



  checkIsAdmin() {
    if (sessionStorage.getItem('admin') == 'true') {
      this.admin = true

    }

  }

  ProdOptions() {
    //set selects based on database
    this.service.getProdListNew(this.params).subscribe(data => {
      let products = data.products;

      if (this.flagSub) {
        let tempS = products.map((elem) => elem.subCategory);
        this.SubCategory = tempS.filter((value, index, array) => array.indexOf(value) === index);

      }
      let tempC = products.map((elem) => elem.colour)
      this.Colours = tempC.filter((value, index, array) => array.indexOf(value) === index);
      let tempP = products.map((elem) => elem.productType)
      this.ProductType = tempP.filter((value, index, array) => array.indexOf(value) === index);
      let tempU = products.map((elem) => elem.usage)
      this.Usage = tempU.filter((value, index, array) => array.indexOf(value) === index);


    });

  }


  refreshProdList() {
    // get products
    this.service.getProdListNew(this.paramsPag).subscribe(data => {
      this.ProductList = data.products;
      this.count = data.count;
      if ((this.ProductList.length == 0)) {
        this.noResults = true;
        console.log(this.noResults)

      }


    });
  }



  changeGender(event: Event): void {

    let elementId: string = (event.target as Element).id;
    this.flagSub = true;
    let url = 'products/' + elementId
    this.router.navigateByUrl(url)
    this.paramsPag.gender = elementId;
    this.params.gender = elementId;
    console.log('gender')
    console.log(this.params.gender)

    this.isSelectVisible = false;
    this.isButtonFilterChecked = false;

    this.noResults = false;
    this.refreshSelect();
    this.refreshProdList();
    this.ProdOptions();



  }

  refreshSelect() {
    this.paramsPag.search = ''
    this.paramsPag.colour = ''
    this.paramsPag.p = 1
    this.paramsPag.productType = ''
    this.paramsPag.subCategory = ''
    this.paramsPag.usage = ''
    this.params.colour = ''
    this.params.productType = ''
    this.params.subCategory = ''
    this.params.usage = ''


    if (this.isSelectVisible) {
      let selectColour = document.getElementById("colour") as HTMLSelectElement
      selectColour.value = ''
      let selectProductType = document.getElementById("productType") as HTMLSelectElement
      selectProductType.value = ''
      let selectUsage = document.getElementById("usage") as HTMLSelectElement
      selectUsage.value = ''

    }




  }


  changeSub(event: Event) {

    let elementId: string = (event.target as Element).id;
    this.flagSub = false;
    this.paramsPag.p = 1;
    this.refreshSelect();
    console.log(elementId)
    if (elementId == 'all') {
      this.params.subCategory = '';
      this.paramsPag.subCategory = '';
    } else {
      this.params.subCategory = elementId;
      this.paramsPag.subCategory = elementId;
    }


    this.ProdOptions();


  }

  onSubmit(form: FormGroup) {

    if (form.valid) {

      this.isSelectVisible = false;
      this.paramsPag.colour = ''
      this.paramsPag.productType = ''
      this.paramsPag.subCategory = ''
      this.paramsPag.usage = ''
      this.paramsPag.p = 1
      this.paramsPag.search = form.value.search
      this.noResults = false
      this.refreshProdList();
      this.isButtonFilterChecked = false;


    }

  }

  getSelectedValue(event: any, select: string) {


    this.paramsPag.p = 1;
    this.flagSub = false;
    if (select == 'colour') {
      this.paramsPag.colour = event.target.value;
      this.params.colour = event.target.value;
    }
    if (select == 'subCategory') {
      this.paramsPag.subCategory = event.target.value;
      this.params.subCategory = event.target.value;

    }
    if (select == 'productType') {
      this.paramsPag.productType = event.target.value;
      this.params.productType = event.target.value;


    }
    if (select == 'usage') {
      this.paramsPag.usage = event.target.value;
      this.params.usage = event.target.value;
    }




  }

  changeVisibility(e: any) {
    this.isButtonFilterChecked = e.target.checked
    // this.isButtonFilterVisible=!this.isButtonFilterVisible;
    if (e.target.checked) {
      this.isSelectVisible = true;

    } else {
      this.isSelectVisible = false;

    }
    this.paramsPag.colour = ''
    this.paramsPag.productType = ''
    this.paramsPag.subCategory = ''
    this.paramsPag.usage = ''
    this.noResults = false;
    this.refreshProdList();




  }


  closeSearch() {
    this.isSelectVisible = false;
    this.paramsPag.search = '';
    this.refreshProdList();
    this.noResults = false;

  }

  onPageChanged(newPage: number): void {
    this.paramsPag.p = newPage;
    this.refreshProdList();

  }

  logout() {
    this.service.logout();
    this.router.navigateByUrl('');
    Swal.fire({
      'text': 'You have successfully logged out',
      'icon': 'info'
    }

    )
  }



  addtoCart(product: Product) {
    this.cartService.addtoCart(product);
    this.stickyCart = true;
    setTimeout(() => {
      this.stickyCart = false
    }, 5000)
    // Swal.fire({
    //   icon:'success',
    //   title: 'You have added an item to the cart!',
    //   footer: '<a href="http://localhost:4200/cart">Cart</a>'
    // })

  }

  filter() {
    this.refreshProdList();
    this.noResults = false;

  }


}
