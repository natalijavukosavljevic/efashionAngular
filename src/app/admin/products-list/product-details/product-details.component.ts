import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Product } from '../../model/Product';
import { ShopServiceService } from 'src/app/services/shop-service.service';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { Review } from '../../model/Review';
import { ReviewList } from '../../model/ReviewList';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsComponent implements OnInit {
  chosenProduct: Product;
  currentRate = 5;
  logged: boolean = false;
  hoverButton: boolean = false;
  reviewFlag = false;
  @Input()
  cart: Product[] = [];
  reviews: Review[] = [];
  mostSimiliar: string[] = []
  mostSimiliarProducts: Product[] = []

  reviewForm: FormGroup;
  userReview = {};

  constructor(
    private service: ShopServiceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cartService: CartServiceService,
    private router: Router
  ) {
    this.chosenProduct = new Product();
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.updateProduct();





    if (sessionStorage.getItem('access')) {
      this.logged = true;
    }



  }


  add() {
    this.cartService.addtoCart(this.chosenProduct);

  }

  updateProduct() {
    this.route.params.subscribe((params: Params) => {
      this.service.getProduct(params['id']).subscribe((data) => {
        this.chosenProduct = data;
        this.mostSimiliar = []
        this.mostSimiliarProducts = []
        this.zoomOut()
        this.mostSimiliar = this.chosenProduct.mostSimilar.split(',')
        for (const mId of this.mostSimiliar) {
          this.service.getProduct(Number(mId)).subscribe(
            (res) => {
              this.mostSimiliarProducts.push(res)
              console.log(this.mostSimiliarProducts)
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

        console.log(this.chosenProduct)
        console.log(this.mostSimiliar)
        this.reviewsUpdate(this.chosenProduct.id)

      });
    });

  }

  reviewsUpdate(productId: number) {
    this.service.getReviews(productId).subscribe(
      res => {
        this.reviews = res.reviews
        console.log('review')
        console.log(res)
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

  review() {
    if (this.logged) {
      this.reviewFlag = !this.reviewFlag;
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Only registred users can comment. Please log in.',
        footer: '<a href="http://localhost:4200/login">Log in</a>',

      })
    }



  }

  magnifyOnClick() {
    console.log('magnify')

    this.magnify('myImage' + this.chosenProduct.id, 3);



  }

  zoomOut() {
    console.log('zoom out')
    var zooms = document.querySelectorAll(".img-magnifier-glass");
    console.log(zooms)
    console.log(zooms.length)
    for (var x = 0; x < zooms.length; x++) {
      zooms[x].parentNode?.removeChild(zooms[x]);
    }

  }

  mouseEnter() {
    this.hoverButton = true;

  }

  mouseLeave() {
    this.hoverButton = false;

  }


  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.userReview = {
        body: form.value.comment,
        product: this.chosenProduct.id,
        value: this.currentRate

      };

      this.service.postReview(this.userReview).subscribe(
        res => {
          console.log('review')
          console.log(res)
          this.updateProduct()
          this.reviewsUpdate(this.chosenProduct.id);
          Swal.fire({
            icon: 'success',
            title: 'Congrates',
            text: 'You added review',

          })

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You already commented!',

          })

        }

      )



    }
  }

  magnify(imgID: any, zoom: any) {
    //var img, glass, w, h, bw;
    var img = document.getElementById(imgID) as HTMLImageElement;
    console.log(img);
    /*create magnifier glass:*/
    var glass = document.createElement('DIV');
    glass.setAttribute('class', 'img-magnifier-glass');
    /*insert magnifier glass:*/
    console.log('magnify');
    img?.parentElement?.insertBefore(glass, img);
    /*set background properties for the magnifier glass:*/
    console.log(img.src);
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = 'no-repeat';
    glass.style.backgroundSize =
      img.width * zoom + 'px ' + img.height * zoom + 'px';

    var bw = 3;
    var w = glass.offsetWidth / 2;
    var h = glass.offsetHeight / 2;
    /*execute a function when someone moves the magnifier glass over the image:*/
    glass.addEventListener('mousemove', moveMagnifier);
    img.addEventListener('mousemove', moveMagnifier);
    /*and also for touch screens:*/
    glass.addEventListener('touchmove', moveMagnifier);
    img.addEventListener('touchmove', moveMagnifier);
    function moveMagnifier(e: any) {
      var pos, x, y;
      /*prevent any other actions that may occur when moving over the image*/
      e.preventDefault();
      /*get the cursor's x and y positions:*/
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;

      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > img.width - w / zoom) {
        x = img.width - w / zoom;
      }
      if (x < w / zoom) {
        x = w / zoom;
      }
      if (y > img.height - h / zoom) {
        y = img.height - h / zoom;
      }
      if (y < h / zoom) {
        y = h / zoom;
      }
      /*set the position of the magnifier glass:*/
      glass.style.left = x - w + 'px';
      glass.style.top = y - h + 'px';
      /*display what the magnifier glass "sees":*/
      glass.style.backgroundPosition =
        '-' + (x * zoom - w + bw) + 'px -' + (y * zoom - h + bw) + 'px';
    }
    function getCursorPos(e: any) {
      var a,
        x = 0,
        y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x and y coordinates, relative to the image:*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return { x: x, y: y };
    }
  }
}
