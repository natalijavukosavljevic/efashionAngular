import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../services/cart-service.service';
import { Product } from '../admin/model/Product';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { Customer } from '../admin/model/Customer';
import { ProductSet } from '../admin/model/ProductSet';
import { Cart } from '../admin/model/Cart';
import { ShopServiceService } from '../services/shop-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  productsList: Product[] = [];
  quantityList: Number[] = [];
  isLogged: boolean = false;

  cartL: Cart;
  changeEmailVar: boolean = false;
  orderForm: FormGroup;
  customer: any = {};
  customerObtained: Customer;
  warning: string = '';

  constructor(
    private cartService: CartServiceService,
    private fb: FormBuilder,

  ) {
    this.customerObtained = new Customer();
    this.cartL = new Cart();
    this.orderForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getProductsCart();
    this.getCart();
    if (sessionStorage.getItem('access')) {
      this.cartService.getCustomer().subscribe((res) => {
        console.log(res)
        this.customerObtained = res;
        if (this.customerObtained.address != null) {

          let tempC = {
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
          };
          let name = this.customerObtained.fullName.split(' ');
          tempC.firstName = name[0];
          tempC.lastName = name[1];
          tempC.phoneNumber = this.customerObtained.phoneNumber;
          tempC.address = this.customerObtained.address;
          this.orderForm.patchValue(tempC);
          console.log(this.customerObtained);
          console.log(tempC);
        }
      });
    } else {
      this.orderForm?.addControl(
        'email',
        new FormControl('', [Validators.required])
      );
    }

    if (sessionStorage.getItem('access')) {
      this.isLogged = true;
    }
  }

  getProductsCart() {
    this.cartService.getProducts().subscribe(
      (res) => {
        this.productsList = res;
        console.log(this.productsList);
      },
      (error) => {
        Swal.fire(
          'Error occured !' + error.statusText,
          'We are sorry',
          'warning'
        );
      }
    );
  }

  getCart() {
    this.cartService.getCart().subscribe(
      (res) => {
        this.quantityList = res.quantity;
        this.cartL = res;
        console.log('ORDERU cart');
        console.log(res);
        console.log(this.quantityList);
      },
      (error) => {
        Swal.fire(
          'Error occured !' + error.statusText,
          'We are sorry',
          'warning'
        );
      }
    );
  }


  onSubmit(form: FormGroup) {
    console.log('submit');
    if (form.valid) {
      this.customer = {
        firstName: form.value.firstName,
        lastName: form.value.lastName,
        address: form.value.address,
        phoneNumber: form.value.phoneNumber,
      };

      // if (this.changeEmailVar) {
      //   this.customer['email'] = form.value.email;
      // }

      //two cases : registred customer, non-registred customer

      if (sessionStorage.getItem('access')) {
        this.cartService.editCustomer(this.customer).subscribe((data) => {
          if (typeof data == 'string') {
            this.warning = data;
          } else {
            this.warning = '';
            Swal.fire(
              'We are preparing your order!',
              'Thank you ' + this.customer['firstName'],
              'success'
            );
            this.cartService.saveCart(this.cartL, false);
            setTimeout(() => {
              this.cartService.createOrder();
            }, 1000);
          }
        }, (error) => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry',
            'warning'
          );
        }

        );
      } else {
        this.customer = {
          firstName: form.value.firstName,
          lastName: form.value.lastName,
          address: form.value.address,
          phoneNumber: form.value.phoneNumber,
          email: form.value.email,
          productId: this.cartL.productId,
          quantity: this.cartL.quantity,
        };
        console.log(this.customer);
        this.cartService
          .createNonRegisteredCustomer(this.customer)
          .subscribe((data) => {
            console.log(data);
            console.log(this.customer);
            console.log(typeof data);
            if (typeof data == 'string') {
              this.warning = data;
            } else {
              this.warning = '';
              this.customerObtained = data;
              Swal.fire(
                'We are preparing your order',
                'Welcome ' + this.customer['firstName'],
                'success'
              );
              setTimeout(() => {
                this.cartService.createOrder(this.customerObtained);
              }, 1000);

            }
          },
            (error) => {

              Swal.fire(
                'Error occured !' + error.statusText,
                'We are sorry. Please delete cart and try again!',
                'warning'
              );
            }


          );
      }
    }
  }



}
