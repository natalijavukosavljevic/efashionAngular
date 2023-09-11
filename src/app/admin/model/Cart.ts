export class Cart{
	
	productId :number[];
	quantity :number[];
   



	

	constructor(obj? :any){
		this.productId = obj && obj.productId || [];
		this.quantity = obj && obj.quantity || [];
   
        

	}


}