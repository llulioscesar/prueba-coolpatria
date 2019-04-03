import {UsuarioModel} from "../../core/models/usuario.model";

export class RegisterObjectModel {
  public user : UsuarioModel;
  public sede: string;

  constructor(obj:any){
    this.user = new UsuarioModel();
    this.user.isAdmin = false;
    this.user.document = (obj.document) ? obj.document : null;
    this.user.name = (obj.name) ? obj.name : null;
    this.user.email = (obj.email) ? obj.email : null;
    this.user.password = (obj.password1) ? obj.password1 : null;
    this.sede = (obj.sede) ? obj.sede : null;
  }

}
