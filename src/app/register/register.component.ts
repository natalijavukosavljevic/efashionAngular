import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShopServiceService } from '../services/shop-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user: any;
  registerForm: FormGroup;
  responseRegister: any;
  warning: string = '';

  constructor(
    private service: ShopServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void { }

  onSubmit(form: FormGroup) {
    console.log(this.registerForm.controls['username'].touched);
    console.log(this.registerForm.controls['username'].valid);
    this.warning = '';
    if (form.valid) {
      this.user = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
        confirm_password: form.value.confirm_password,
      };

      this.service.register(this.user).subscribe((data) => {
        if (typeof data == 'string') {
          this.warning = data;
        } else {
          Swal.fire(
            'You have successfully registrated!',
            'Welcome ' + this.user['username'],
            'success'
          );
          this.service.login(this.user);
          setTimeout(() => {
            this.router.navigateByUrl('')

          }, 1000);

        }
      });
    } else {
      Swal.fire('Error occured!', 'warning');

    }
  }
}
