import { Component, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  // images = [43696, 42419, 7731, 11497].map((n) => `http://127.0.0.1:8000/images/products/${n}.jpg`);


  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree

  }

}
