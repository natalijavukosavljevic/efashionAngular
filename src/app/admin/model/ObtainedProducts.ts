import { Product } from './Product';

export class ObtainedProducts{
	products: Product[];
    next: string;
    previous:string;
    count: number;

	constructor(obj? :any){
		this.products = obj && obj.results.map((elem: any) => { return new Product(elem); }) || [];
        this.count = obj && obj.count || 0;
        this.previous = obj && obj.previous || ' ';
	    this.next = obj && obj.pnext || ' ';
	
	}	
}