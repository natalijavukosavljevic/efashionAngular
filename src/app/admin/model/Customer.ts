
import { ProductSet } from "./ProductSet";

export class Customer{
	id :number;
	phoneNumber :string;
	address :string;
	fullName:string;
	cart:ProductSet[];
	
   



	

	constructor(obj? :any){
		this.id = obj && obj.id || null;
		this.phoneNumber = obj && obj.phoneNumber || null; 
		this.address = obj && obj.address || null;
		this.cart = obj && obj.cart.map((elem: any) => { return new ProductSet(elem); }) || [];
		this.fullName=obj && obj.fullName || [];
		
        

	}


}