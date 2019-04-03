export class UsuarioModel {
  public _id: string;
  public name: string;
  public email: string;
  public isAdmin: boolean;
  public document: string;
  public created_date: Date;
  public password?: string;
}
