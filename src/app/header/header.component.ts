import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { ShopServiceService } from '../services/shop-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //public totalItem:Observable<number>;
  public totalItem: number = 0;
  public customer: boolean = true;
  public admin: boolean = false;
  adminString: string = '';
  username: string = 'login'

  constructor(private service: ShopServiceService, private cartService: CartServiceService) {




  }


  ngOnInit() {

    console.log('header')

    this.cartService.getQuantity()
      .subscribe(res => {
        this.totalItem = res.reduce((a: number, b: number) => a + b, 0);
      })

    //changing header based on is admin logged or admin logged

    this.service.getUsername().subscribe(res => {
      this.username = res

    })

    this.service.getAdmin().subscribe(res => {
      if (res == 'true') {
        this.admin = true;
        this.customer = false;
      } else {
        this.admin = false;
        this.customer = true;
      }

    })




  }




}
