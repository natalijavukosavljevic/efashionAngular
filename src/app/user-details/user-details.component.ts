import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { ShopServiceService } from '../services/shop-service.service';
import { Product } from '../admin/model/Product';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  orders: any;
  adresses: any = [];
  products: any = [];
  empty: boolean = true;
  username: any = ''




  constructor(private cartService: CartServiceService, private service: ShopServiceService, private router: Router) {
    this.orders = []

  }


  ngOnInit(): void {

    this.service.getUsername().subscribe(res => {
      this.username = res

    })

    this.cartService.getOrders()
      .subscribe(res => {

        for (let i = 0; i < res.orders.length; i++) {
          console.log(typeof (res.orders[i].date))

          let temp: Product[] = []

          for (let j = 0; j < res.orders[i].cart.length; j++) {
            this.service.getProduct(res.orders[i].cart[j].product).subscribe(
              data => {
                data.quantity = res.orders[i].cart[j].quantity
                temp.push(data)

              },
              (error) => {
                Swal.fire(
                  'Error occured !' + error.statusText,
                  'We are sorry',
                  'warning'
                );
              }

            )

          }

          this.orders.push({ 'date': new Date(res.orders[i].date).toDateString(), 'address': res.orders[i].address, 'phoneNumber': res.orders[i].phoneNumber, 'products': temp, 'price': res.orders[i].price })




        }
        if (this.orders.length != 0) {
          this.empty = false;
        }




      },
        (error) => {

          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }

      )




  }

  logout() {
    this.service.logout();
    this.cartService.removeAllCart();

    setTimeout(() => {
      this.router.navigateByUrl('');
      Swal.fire({
        icon: 'info',
        text: 'You have successfully logged out!',

      })

    }, 1000);



  }


}


