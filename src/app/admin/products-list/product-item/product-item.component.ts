import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../model/Product';
import { ShopServiceService } from 'src/app/services/shop-service.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input()
  product: Product = new Product();
  @Input()
  admin: boolean = false;
  @Output() emiter: EventEmitter<Product>

  productList: Product[];
  hoverButton: boolean = false;
  constructor(private service: ShopServiceService) {
    this.productList = [];
    this.emiter = new EventEmitter();

  }

  ngOnInit(): void {

  }

  mouseEnter() {
    this.hoverButton = true;
    console.log(this.hoverButton && !this.admin)

  }

  mouseLeave() {
    this.hoverButton = false;

  }

  add() {
    this.emiter.emit(this.product);
    console.log('add')
    console.log(this.product)

  }

}
