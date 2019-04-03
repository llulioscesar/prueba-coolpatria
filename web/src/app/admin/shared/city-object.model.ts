export class CityObjectModel {
  public name: string;
  public departament: string;

  constructor(obj: any){
    this.departament = (obj.departament) ? obj.departament : null;
    this.name = (obj.name) ? obj.name : null;
  }
}
