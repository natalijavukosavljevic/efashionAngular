
import { ProductSet } from "./ProductSet";

export class Review{
	product :number;
	owner :string;
    id:string;
	body :string;
	value:number;
	ownerName:string;
	//treba productSet
	
	
   



	

	constructor(obj? :any){
		this.product = obj && obj.product|| null;
        this.id= obj && obj.id || null;
		this.owner = obj && obj.owner || null; //promeni kasnije u phoneNumber
		this.ownerName = obj && obj.ownerName || null; 
		this.body = obj && obj.body || null;
		this.value=obj && obj.value || [];
		
        

	}


}