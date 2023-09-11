import { EventEmitter, Injectable, NgZone, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs'
import { JsonToken } from './model/JsonToken';
import { catchError, map } from 'rxjs/operators'
import { Router } from '@angular/router';
import { Product } from '../admin/model/Product';
import { ObtainedProducts } from '../admin/model/ObtainedProducts';
import Swal from 'sweetalert2';
import { Pair } from '../admin/model/Pair';
import { Review } from '../admin/model/Review';
import { ReviewList } from '../admin/model/ReviewList';




@Injectable({
  providedIn: 'root'
})
export class ShopServiceService {

  private token: JsonToken = new JsonToken()
  private refreshTokenTimeout: any;

  private usernameB = new BehaviorSubject<any>('login');
  private adminB = new BehaviorSubject<any>('false');



  private httpOptionsSecond = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private httpOptions = {};

  private httpOptionsAuth = {};

  readonly APIUrl = "http://127.0.0.1:8000/"


  constructor(private http: HttpClient) {


  }






  public getProdListNew(params?: any): Observable<ObtainedProducts> {
    //get products with params

    let options = {}
    if (params) {
      options = {
        params: new HttpParams()
          .set('search', params.search || "")
          .set('ordering', params.ordering || "")
          .set('gender', params.gender || "")
          .set('colour', params.colour || "")
          .set('productType', params.productType || "")
          .set('usage', params.usage || "")
          .set('subCategory', params.subCategory || "")
          .set('p', params.p || "")
          .set('page_size', params.page_size || "")

      }
    }


    return this.http.get(this.APIUrl + 'getProducts/', options).pipe(map(
      data => {
        return new ObtainedProducts(data)
      },


    ));

  }



  public getProduct(id: number): Observable<Product> {
    //get product based on id

    return this.http.get(this.APIUrl + 'products/' + id.toString()).pipe(map(
      data => {
        return new Product(data)
      }

    ));


  }


  public editProduct(product: any, id: number): Observable<Product> {
    //edit product with authorization

    if (sessionStorage.getItem('access')) {
      this.httpOptions = {
        headers: new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem('access') })
      };
    }

    return this.http.post(this.APIUrl + 'productUpdate/' + id.toString() + '/', product, this.httpOptions).pipe(map(
      data => {
        return new Product(data)
      }
    ));


  }


  public deleteProduct(id: number): Observable<Product> {
    //delete product with authorization
    if (sessionStorage.getItem('access')) {
      console.log(sessionStorage.getItem('access'))
      this.httpOptionsAuth = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('access') })
      };
    }

    return this.http.delete(this.APIUrl + 'productDelete/' + id.toString() + '/', this.httpOptionsAuth).pipe(map(
      data => {
        let n = new Product(data)
        console.log(n);
        return new Product(data)
      }

    ));


  }

  public addProduct(product: any): Observable<Product> {
    //add product with authorization

    if (sessionStorage.getItem('access')) {
      this.httpOptions = {
        headers: new HttpHeaders({ "Authorization": "Bearer " + sessionStorage.getItem('access') })
      };
    }

    return this.http.post(this.APIUrl + 'productAdd/', product, this.httpOptions).pipe(map(
      data => {
        let n = new Product(data)
        return new Product(data)
      }
    ));


  }








  public getPairs(): Observable<Pair> {
    return this.http.get(this.APIUrl + 'uniqueAttributtes/').pipe(map(
      data => {
        return new Pair(data);
      }

    ));

  }


  public getReviews(productId: number): Observable<ReviewList> {
    return this.http.get(this.APIUrl + 'review/' + productId.toString() + '/').pipe(map(
      data => {
        return new ReviewList(data);
      }

    ));

  }

  public postReview(review: any): Observable<Review> {

    if (sessionStorage.getItem('access')) {
      this.httpOptionsAuth = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + sessionStorage.getItem('access') })
      };
    }

    return this.http.post(this.APIUrl + 'postReview/', JSON.stringify(review), this.httpOptionsAuth).pipe(map(
      data => {
        return new Review(data);

      }

    ));

  }





  public register(user: any): Observable<any> {
    return this.http.post(this.APIUrl + 'createCustomer/', JSON.stringify(user), this.httpOptionsSecond).pipe(map(
      data => {
        return data;
      }

    ));

  }


  public login(user: any) {
    //generating JWT token based on user data
    this.http.post<any>(this.APIUrl + '/users/custom-token/', JSON.stringify(user), this.httpOptionsSecond).subscribe({
      next: data => {
        //saving data in sessionstorage
        this.token = data as JsonToken
        this.usernameB.next(user['username'])
        this.adminB.next(this.token.admin.toString())
        sessionStorage.setItem('admin', this.token.admin.toString())
        sessionStorage.setItem('access', this.token.access);
        sessionStorage.setItem('username', user['username']);
        sessionStorage.setItem('logged', 'true')
        this.startRefreshTokenTimer();

      },

      error: error => {
        Swal.fire({
          title: 'Username or password are not correct. Please try again!',
          icon: 'error'
        })



      },
      complete: () => {

        if (this.token.admin) {
          Swal.fire(
            'You have successfully logged in!',
            'Welcome back ' + 'admin ' + user['username'],
            'success'
          )
        } else {
          Swal.fire(
            'You have successfully logged in!',
            'Hello ' + user['username'],
            'success'
          )

        }

      }




    })


  }


  public getUsername() {
    if (sessionStorage.getItem('username')) {
      this.usernameB.next(sessionStorage.getItem('username'))
    } else {
      this.usernameB.next('login')
    }
    return this.usernameB.asObservable()
  }

  public getAdmin() {
    if (sessionStorage.getItem('admin')) {
      this.adminB.next(sessionStorage.getItem('admin'))
    } else {
      this.adminB.next('false')
    }
    return this.adminB.asObservable()

  }





  public logout() {
    console.log('logout')
    sessionStorage.removeItem('admin')
    sessionStorage.removeItem('access')
    sessionStorage.removeItem('username')
    // sessionStorage.setItem('cart', '[]')
    // sessionStorage.setItem('quantity', '[]')
    sessionStorage.removeItem('cart')
    sessionStorage.removeItem('quantity')
    sessionStorage.setItem('logged', 'false')
    this.token = new JsonToken();
    this.usernameB.next('login')
    this.adminB.next('false')
    this.stopRefreshTokenTimer();


  }

  private refreshToken() {
    console.log('refresh')
    let refresh = {
      "refresh": this.token.refresh,
    }

    this.http.post<any>(this.APIUrl + 'users/token/refresh/', JSON.stringify(refresh), this.httpOptionsSecond).subscribe({
      next: data => {
        this.token.access = data.access;
        sessionStorage.setItem('logged', 'true')
        sessionStorage.setItem('access', data.access);
        this.startRefreshTokenTimer();
      },

      error: error => {
        Swal.fire({
          title: 'Error occured!',
          icon: 'error'
        })
      }



    })


  }



  private startRefreshTokenTimer() {

    console.log("start refreshing")
    const expires = new Date(60 * 2 * 1000);
    const timeout = 60 * 15 * 1000 - 60 * 1000;
    console.log(timeout);
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshToken()
      , timeout
    );

  }

  stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  public sendTemporaryToken(data: any): Observable<any> {
    return this.http.put(this.APIUrl + 'sendTemporaryToken/', JSON.stringify(data), this.httpOptionsSecond).pipe(map(
      data => {
        return data;
      }

    ));

  }

  public passwordChange(data: any): Observable<any> {
    return this.http.put(this.APIUrl + 'passwordChange/', JSON.stringify(data), this.httpOptionsSecond).pipe(map(
      data => {
        return data;
      }

    ));

  }



}







