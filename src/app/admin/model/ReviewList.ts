import { Review } from './Review';

export class ReviewList{
	reviews: Review[];

	constructor(obj? :any){
		this.reviews = obj && obj.map((elem: any) => { return new Review(elem); }) || [];

	
	}	
}