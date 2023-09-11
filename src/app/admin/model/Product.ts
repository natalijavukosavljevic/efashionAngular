export class Product{
	id :number;
	subCategory :string;
	productType :string;
    gender:string;
    category:string;
    colour:string;
    usage:string;
    productTitle:string;
    productImage:string;
    imageUrl:string;
    quantity:number;
	price:number;
    numberOfStars:number;
    binarySim:string;
    mostSimilar:string;



	

	constructor(obj? :any){
		this.id = obj && obj.id || null;
		this.subCategory = obj && obj.subCategory || null;
		this.productType = obj && obj.productType || null;
		this.gender = obj && obj.gender || null;
		this.category = obj && obj.category || null;
        this.colour = obj && obj.colour || null;
        this.usage = obj && obj.usage || null;
        this.productTitle = obj && obj.productTitle || null;
        this.imageUrl=obj && obj.imageUrl || null;
        this.quantity = obj && obj.quantity || 0;
		this.price = obj && obj.price || null;
        this.numberOfStars = obj && obj.numberOfStars || null;
        this.binarySim = obj && obj.binarySim || null;
        this.mostSimilar = obj && obj.mostSimilar || null;
        
        if (obj?.productImage.includes('http://127.0.0.1:8000')){
            this.productImage=obj && obj.productImage || null ;
        }else{
            this.productImage=obj && 'http://127.0.0.1:8000'+obj.productImage || null ;
        }
       
        

	}


}