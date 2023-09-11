import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShopServiceService } from './services/shop-service.service';
import { CartServiceService } from './services/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges {
  title = 'efashionAngular';

 

  constructor(private service:ShopServiceService, private cartService:CartServiceService){
    
  }


  ngOnInit() {
   
    
    
    
  }
  ngOnChanges(changes: SimpleChanges): void {
  
  }

 


  
}
