import { Component, OnInit } from '@angular/core';
import { ShopServiceService } from '../services/shop-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  emailForm: FormGroup;
  passwordForm: FormGroup;
  text: string = '';
  notify: string = '';
  email: any;
  password: any;
  sent: boolean = false;

  constructor(private service: ShopServiceService, private fb: FormBuilder,) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required]]
    });

    this.passwordForm = this.fb.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    });

  }



  ngOnInit(): void {


  }



  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.email = {
        email: form.value.email,
      };
      this.service.sendTemporaryToken(this.email).subscribe(data => {
        this.text = data;

        if (this.text == "Token was sent on your email adress") { //mozda ovo moze nekako lepse sa error
          this.sent = true;


        }

      },
        (error) => {
          Swal.fire(
            'Error occured !' + error.statusText,
            'We are sorry. Customer with typed email adress doesnt exist!',
            'warning'
          );
        }

      )

    }
  }


  onSubmitPassword(form: FormGroup) {
    if (form.valid) {
      this.password = {
        email: this.email.email,
        password: form.value.password,
        confirm_password: form.value.confirm_password,
        token: form.value.token,
      };

      this.service.passwordChange(this.password).subscribe(data => {
        this.notify = data;

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




  }

}
