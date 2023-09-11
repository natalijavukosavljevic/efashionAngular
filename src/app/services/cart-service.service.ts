import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../admin/model/Product';
import { Cart } from '../admin/model/Cart';
import Swal from 'sweetalert2';
import { Customer } from '../admin/model/Customer';
import { ShopServiceService } from './shop-service.service';
import { OrdersList } from '../admin/model/OrdersList';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit {
  readonly APIUrl = "http://127.0.0.1:8000/"
  private cartItemList: Product[] = []
  private productList = new BehaviorSubject<any>([]);
  private cartQuantity: number[] = []
  private quantityList = new BehaviorSubject<any>([]);
  private cart = new BehaviorSubject<Cart>(new Cart);
  private totalPrice = new BehaviorSubject<number>(0);
  private customer: Customer = new Customer;


  private httpOptionsAuth = {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  ngOnInit(): void {

  }



  constructor(private http: HttpClient, private service: ShopServiceService) {


  }


  private checkAuth(): boolean {
    //check authorization
    if (sessionStorage.getItem('access')) {
      this.httpOptionsAuth = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('access') })
      };
      return true;
    } else {
      console.log('not authoriazed')
      return false;

    }

  }


  public deleteCart() {

    if (this.checkAuth()) {
      this.http.delete(this.APIUrl + 'deleteCart/', this.httpOptionsAuth).subscribe(
        next => {
          this.removeAllCart();
          Swal.fire(
            'You have emptied cart!',
            'warning')
        },
        error => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }


      );


    } else {
      this.removeAllCart();
      Swal.fire(
        'You have emptied cart!',
        'warning')
    }



  }

  public saveCart(cart: Cart, notify: boolean = true) {
    //cart saving for registered customers
    if (this.checkAuth()) {
      this.http.put(this.APIUrl + 'updateCart/', JSON.stringify(cart), this.httpOptionsAuth).subscribe(
        next => {
          if (notify) {
            Swal.fire(
              'You have successfully saved a cart!',
              'We are saving products for time period of 30 minutes',
              'success'
            );
          }

        },
        error => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }


      );

    }



  }



  public getProducts() {
    //get products inside cart
    const storage = JSON.parse(sessionStorage.getItem('cart') || '[]');
    console.log('getProducts')
    console.log(storage.length)
    if (storage.length > 0) {
      this.cartItemList = storage
      this.productList.next(this.cartItemList);
    }

    console.log(this.cartItemList)
    sessionStorage.setItem('cart', JSON.stringify(this.cartItemList))
    return this.productList.asObservable();
  }





  public changeQuantityArray(quantityArray: number[]) {
    this.cartQuantity = quantityArray;
    console.log(this.cartQuantity);
    this.quantityList.next(this.cartQuantity);
    sessionStorage.setItem('quantity', JSON.stringify(this.cartQuantity))
  }


  public getQuantity() {
    //get quantatity of products inside a cart
    const storage = JSON.parse(sessionStorage.getItem('quantity') || '[]');
    console.log('get quantity')
    console.log(storage.length)
    if (storage.length > 0) {
      this.cartQuantity = storage
      this.quantityList.next(this.cartQuantity);
    }
    console.log(this.cartItemList)
    sessionStorage.setItem('quantity', JSON.stringify(this.cartQuantity))
    return this.quantityList.asObservable();
  }

  public setCart(cart: Cart) {
    this.cart.next(cart);

  }

  public getCart() {
    return this.cart.asObservable();
  }



  public addtoCart(product: Product) {
    console.log('addtocart')
    this.cartItemList.push(product);
    console.log(this.cartItemList)
    this.productList.next(this.cartItemList);
    this.cartQuantity.push(1);
    this.quantityList.next(this.cartQuantity)
    this.getTotalPrice();
    this.update();
  }
  public getTotalPrice(): Observable<number> {
    let grandTotal = 0;
    console.log(this.cartItemList.length)
    for (var i = 0; i < this.cartItemList.length; i++) {
      grandTotal += this.cartItemList[i].price * this.cartQuantity[i]


    }
    console.log('grand total')
    console.log(grandTotal)
    this.totalPrice.next(grandTotal);
    return this.totalPrice.asObservable();
  }


  public removeCartItem(product: Product) {
    this.cartItemList.map((element: Product, index: any) => {
      if (product.id === element.id) {
        this.cartItemList.splice(index, 1);
        this.cartQuantity.splice(index, 1);
      }
    })

    this.productList.next(this.cartItemList);
    this.quantityList.next(this.cartQuantity);
    this.update();
  }
  public removeAllCart() {
    this.cartItemList = []
    this.cartQuantity = []
    this.productList.next(this.cartItemList);
    this.quantityList.next(this.cartQuantity);
    this.totalPrice.next(0);
    sessionStorage.removeItem('quantity')
    sessionStorage.removeItem('cart')
  }


  public setCustomerCart() {
    //loading saved cart into productList and quantityList
    if (this.checkAuth()) {
      this.getCustomer().subscribe(
        res => {
          this.customer = res;
          let c = this.customer.cart;


          var arrayLength = c.length;
          for (let i = 0; i < arrayLength; i++) {
            this.cartItemList = []
            this.cartQuantity = []

            this.service.getProduct(c[i].product).subscribe(
              data => {

                if (data.quantity > 0) {
                  this.cartQuantity.push(this.customer.cart[i].quantity)
                  this.cartItemList.push(data)
                  this.productList.next(this.cartItemList);
                  this.quantityList.next(this.cartQuantity)
                  this.update()

                }



              }


            )

          }


        }

      );

    }

  }

  private update() {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItemList))
    sessionStorage.setItem('quantity', JSON.stringify(this.cartQuantity))
  }




  public createNonRegisteredCustomer(customer: Customer): Observable<any> {

    console.log('non registred')
    console.log(JSON.stringify(customer))


    return this.http.post(this.APIUrl + 'createNonRegistred/', JSON.stringify(customer), this.httpOptions).pipe(map(
      data => {
        console.log(data)

        return data;

      },


    ));



  }

  public getCustomer(): Observable<Customer> {
    //ovo mora biti lepse
    console.log(sessionStorage.getItem('access'))
    if (this.checkAuth()) {

      return this.http.get(this.APIUrl + 'getCustomer/', this.httpOptionsAuth).pipe(map(
        data => {
          console.log(data)

          return new Customer(data);

        },


      ));

    }
    return new Observable();




  }

  public getOrders(): Observable<OrdersList> {  //Observable Order


    if (this.checkAuth()) {
      return this.http.get(this.APIUrl + 'getOrders/', this.httpOptionsAuth).pipe(map(
        data => {
          console.log('u get order funkcija')
          console.log(data)
          return new OrdersList(data)


        },


      ));

    }

    return new Observable;




  }

  public editCustomer(customer: any): Observable<any> {


    if (this.checkAuth()) {
      return this.http.put(this.APIUrl + 'editCustomer/', JSON.stringify(customer), this.httpOptionsAuth).pipe(map(
        data => {
          return data;
        }

      ));

    }

    return new Observable;


  }


  public createOrder(customer: any = "logged") {

    this.checkAuth()

    if (customer == "logged") {
      this.http.post(this.APIUrl + 'createOrder/', JSON.stringify(customer), this.httpOptionsAuth).subscribe( //dodala zbog httpHeadera
        next => {
          Swal.fire(
            'You succesfully ordered',
            'Thank you! ',
            'success'
          );

        },
        error => {

          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }


      )


    } else {

      this.http.post(this.APIUrl + 'orderCreateNonRegistred/', JSON.stringify(customer), this.httpOptions).subscribe(
        next => {
          Swal.fire(
            'You succesfully ordered',
            'Thank you ' + customer['firstName'],
            'success'
          );

        },
        error => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }


      )
    }


  }




}
