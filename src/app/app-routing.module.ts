import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './admin/products-list/products-list.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { EditItemComponent } from './admin/products-list/edit-item/edit-item.component';
import { RegisterComponent } from './register/register.component';

import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './admin/products-list/product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  {path:'',component:HomeComponent},
  { path: 'products/:gender', component: ProductsListComponent },
  { path: 'order', component: OrderComponent },
  {path:'addProduct', component:AddProductComponent},
  {path:'login', component:LoginComponent},
  {path:'login/register', component:RegisterComponent},
  {path:'products/:gender/edit/:id',component:EditItemComponent},
  {path:'products/:gender/detail/:id',component:ProductDetailsComponent},
  {path:'cart',component:CartComponent},
  {path:'user',component:UserDetailsComponent},
  {path:'login/passwordChange',component:PasswordChangeComponent},
  {path:'products/:gender/addProduct',component:AddProductComponent},




  //{ path: 'tutorials/:id', component: TutorialDetailsComponent },
  //{ path: 'add', component: AddTutorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
