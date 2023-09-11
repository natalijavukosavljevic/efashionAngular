import { Product } from './Product';

export class ProductList{
	products: Product[];

	constructor(obj? :any){
		this.products = obj && obj.map((elem: any) => { return new Product(elem); }) || [];
	
	
	}	
}