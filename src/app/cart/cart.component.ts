import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Product } from '../admin/model/Product';
import { CartServiceService } from '../services/cart-service.service';
import { Cart } from '../admin/model/Cart';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  productsList: Product[] = [];
  temp: Product[] = [];
  totalPrice: number = 0;
  cartNew = new Cart();
  isLogged: boolean = false;
  empty: boolean = false;
  quantityList: number[] = [];
  numbers: number[] = [];

  constructor(
    private cartService: CartServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('access')) {
      console.log('is logged');
      this.isLogged = true;
      console.log(this.isLogged);
    } else {
      this.isLogged = false;
    }

    this.getCartItems();
    //this.setItems();
    this.getCartQuantity();
    this.cartService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }

  getCartItems() {
    //get products from cart
    this.cartService.getProducts().subscribe((res) => {
      this.productsList = res;
      console.log('get cart products')
      console.log(res)
      if (this.productsList.length == 0) {
        this.empty = true;
      }

      this.numbers = Array(this.productsList.length)
        .fill(0)
        .map((x, y) => x + y);

      this.cartNew.productId = this.productsList.map((val) => {
        return val.id;
      });


    });
  }

  setItems() {
    this.productsList = this.temp
  }

  getCartQuantity() {
    this.cartService.getQuantity().subscribe((res) => {
      console.log('new quantity');
      console.log(res);
      this.cartNew.quantity = res;
      //console.log(this.productsList[0].productTitle);
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.cartService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }
  emptycart() {
    this.cartService.deleteCart();
    this.cartService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }

  savecart() {
    if (this.isLogged) {
      this.cartService.saveCart(this.cartNew);

    } else {
      Swal.fire({
        icon: 'info',
        title: 'Only registred users can save a cart. Please log in.',
        footer: '<a href="http://localhost:4200/login">Log in</a>',

      })
    }


  }

  order() {
    this.cartService.changeQuantityArray(this.cartNew.quantity);
    this.cartService.setCart(this.cartNew);
    this.router.navigateByUrl('order');
  }

  adding(num: number) {
    this.cartNew.quantity[num]++;
    if (this.cartNew.quantity[num] < 1) {
      this.cartNew.quantity[num] = 1;
    }

    if (this.cartNew.quantity[num] >= this.productsList[num].quantity) {
      this.cartNew.quantity[num] = this.productsList[num].quantity - 1;
    }
    console.log(this.cartNew.quantity)
    this.cartService.changeQuantityArray(this.cartNew.quantity);
    this.cartService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }

  substracting(num: number) {
    this.cartNew.quantity[num]--;
    if (this.cartNew.quantity[num] < 1) {
      this.cartNew.quantity[num] = 1;
    }
    this.cartService.changeQuantityArray(this.cartNew.quantity);
    this.cartService.getTotalPrice().subscribe(res => {
      this.totalPrice = res;
    })
  }
}
