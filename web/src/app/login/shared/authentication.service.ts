import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginObjectModel} from "./login-object.model";
import {Observable, pipe} from "rxjs";
import {map} from 'rxjs/operators'
import {SesionModel} from "../../core/models/sesion.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(loginObj: LoginObjectModel): Observable<SesionModel>{
    return this.http.post<SesionModel>('/api/user/login', loginObj);
  }

  logout(): Observable<Boolean>{
    return this.http.post<Boolean>('/api/user/logout',{});
  }
}
