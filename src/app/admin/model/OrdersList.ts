import { Order } from "./Order";


export class OrdersList{
	orders: Order[];

	constructor(obj? :any){
		this.orders = obj && obj.map((elem: any) => { return new Order(elem); }) || [];
	
	}	
}