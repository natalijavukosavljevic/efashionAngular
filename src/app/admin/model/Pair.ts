export class Pair{
	
	Bottomwear :string[];
	Topwear :string[];
    Flip_Flops:string[];
    Socks:string[];
    Shoes:string[];
    Apparel_Set:string[];
    Dress:string[];
    Innerwear:string[];
    Sandal:string[];
   



	

	constructor(obj? :any){
		this.Bottomwear = obj && obj.Bottomwear || [];
		this.Topwear = obj && obj.Topwear || [];
		this.Flip_Flops = obj && obj.Flip_Flops || [];
		this.Socks = obj && obj.Socks || [];
        this.Shoes = obj && obj.Shoes || [];
        this.Apparel_Set = obj && obj.Apparel_Set || [];
        this.Dress = obj && obj.Dress|| [];
        this.Innerwear = obj && obj.Innerwear || [];
        this.Sandal = obj && obj.Sandal || [];
   
        

	}


}