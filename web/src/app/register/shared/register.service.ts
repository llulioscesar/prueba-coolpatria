import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterObjectModel} from "./register-object.model";
import {Observable} from "rxjs";
import {UsuarioModel} from "../../core/models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  send(value: RegisterObjectModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>('/api/user/register', value)
  }

}
