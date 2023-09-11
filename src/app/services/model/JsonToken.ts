export class JsonToken{

	refresh :string;
	access :string;
	admin:boolean;


	constructor(obj? :any){
		this.refresh = obj && obj.name || null;
		this.access = obj && obj.description || null;
	    this.admin = obj && obj.admin || null;
	}
}