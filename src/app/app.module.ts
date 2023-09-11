import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './admin/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductItemComponent } from './admin/products-list/product-item/product-item.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PaginationComponent } from './admin/products-list/pagination/pagination.component';
import { EditItemComponent } from './admin/products-list/edit-item/edit-item.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './admin/products-list/product-details/product-details.component';
import { HeaderComponent } from './header/header.component';
import { CartServiceService } from './services/cart-service.service';
import { ShopServiceService } from './services/shop-service.service';
import { OrderComponent } from './order/order.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';





@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AddProductComponent,
    LoginComponent,
    ProductItemComponent,
    PaginationComponent,
    EditItemComponent,
    RegisterComponent,
    ProductDetailsComponent,
    CartComponent,
    HeaderComponent,
    OrderComponent,
    UserDetailsComponent,
    PasswordChangeComponent,
    HomeComponent,
    FooterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [CartServiceService,ShopServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
