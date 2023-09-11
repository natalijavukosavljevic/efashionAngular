import { ProductSet } from "./ProductSet";

export class Order{
	id :number;
	customer :string;
	date :string;
	status:boolean;
    price:number;
    address:string;
    phoneNumber:string;
	
	//treba productSet
	cart:ProductSet[];
	
   



	

	constructor(obj? :any){
		this.id = obj && obj.id || null;
		this.customer = obj && obj.customer || null; //promeni kasnije u phoneNumber
		this.date = obj && obj.date || null;
		this.cart = obj && obj.cart.map((elem: any) => { return new ProductSet(elem); }) || [];
		this.status=obj && obj.status || [];
        this.price = obj && obj.price || null;
        this.address = obj && obj.address || null;
        this.phoneNumber = obj && obj.phoneNumber || null;
		
        

	}


}