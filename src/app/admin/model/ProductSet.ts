import { Product } from "./Product";

export class ProductSet{
	id :number;
	product :number;
	quantity :number;



	

	constructor(obj? :any){
		this.id = obj && obj.id || null;
		this.product = obj && obj.product || null;
		this.quantity = obj && obj.quantity || null
        

	}


}