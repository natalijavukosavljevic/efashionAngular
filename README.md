# EfashionAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## App details
API for this app is generated in django repository efashion.
This app enables two working modes:
 1. registered customer and non registered customer
 2. registered admin
Registered customer: NOTE: customer must be logged (registered) to use the perks of the registered user. Actions: adding items to the cart,
ordering, getting customer previous orders , cart saving for limited period time and reviews writing.
Non registered customer: adding items to the cart and ordering.
Registered admin: adding, deleting and editing the products.

## App pages 
Home page
<img src="efashionAngular/src/assets/explanatoryImages/homePage.png"> 

Home page- logged admin
<img src="efashionAngular/src/assets/explanatoryImages/homeAdmin.png"> 

login page
<img src="efashionAngular/src/assets/explanatoryImages/loginPage.png"> 

register page
<img src="efashionAngular/src/assets/explanatoryImages/registerPage.png"> 

registered customer cart
<img src="efashionAngular/src/assets/explanatoryImages/loggedUserCart.png"> 

non registered customer cart
<img src="efashionAngular/src/assets/explanatoryImages/cart.png"> 

order- Note: for registered customers who previously ordered customer data is automatically filled and changeable.
<img src="efashionAngular/src/assets/explanatoryImages/order.png">

after ordering customer gets notification on typed email 
<img src="efashionAngular/src/assets/explanatoryImages/orderEmail.png">

customer details-orders history
<img src="efashionAngular/src/assets/explanatoryImages/customerDetails.png"> 

password change- generated token would be sent on a typed email address if a customer with entered email exists.
<img src="efashionAngular/src/assets/explanatoryImages/passwordChange.png"> 

shop products 
<img src="efashionAngular/src/assets/explanatoryImages/shop.png"> 

filter and search
<img src="efashionAngular/src/assets/explanatoryImages/filterAndSearch.png"> 

rated product details
<img src="efashionAngular/src/assets/explanatoryImages/ratedProductDetails.png"> 

non rated product details
<img src="efashionAngular/src/assets/explanatoryImages/productDetailsNotRated.png"> 

edit products admin
<img src="efashionAngular/src/assets/explanatoryImages/editProductsAdmin.png"> 

edit and delete product admin- hover on product
<img src="efashionAngular/src/assets/explanatoryImages/editItemAdmin.png"> 

add product admin
<img src="efashionAngular/src/assets/explanatoryImages/addProductAdmin.png"> 







