import { Component, EventEmitter, OnInit, Output, setTestabilityGetter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopServiceService } from '../services/shop-service.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartServiceService } from '../services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {





  public user: any;
  myForm: FormGroup;

  constructor(private router: Router, private service: ShopServiceService, private fb: FormBuilder, private cartservice: CartServiceService) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });



  }



  ngOnInit(): void {


  }



  login() {
    this.service.login({ 'username': this.user.username, 'password': this.user.password });

  }


  onSubmit(form: FormGroup) {
    //if form is valid user is logged
    if (form.valid) {
      this.user = {
        username: form.value.username,
        password: form.value.password
      };

      this.login();

      setTimeout(() => {
        let res = sessionStorage.getItem('admin') //mece pomocu subsribe
        console.log(res)
        if (res == 'false') {
          this.cartservice.setCustomerCart()

        }


      }, 1000);



      this.router.navigateByUrl('')




    }


  }








}
