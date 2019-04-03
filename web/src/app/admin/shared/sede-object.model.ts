export class SedeObjectModel {

  public name:string;
  public city:string;

  constructor(obj:any){
    this.name = (obj.name) ? obj.name : null;
    this.city = (obj.city) ? obj.city : null;
  }

}
