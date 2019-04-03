import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {SesionModel} from "../models/sesion.model";
import {UsuarioModel} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession: SesionModel = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSesionData();
  }

  setCurrentSession(session: SesionModel):void{
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSesionData(): SesionModel{
    let sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <SesionModel> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): SesionModel{
    return this.currentSession;
  }

  removeCurrentSession(): void{
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): UsuarioModel {
    var session: SesionModel = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['']);
  }

}
