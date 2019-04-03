import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "../services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class NoAuthorizatedGuard implements CanActivate {

  constructor(private router: Router,
              private storageService: StorageService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.storageService.isAuthenticated()){
      this.router.navigate([this.storageService.getCurrentUser().isAdmin ? 'admin': 'cliente']);
      return false;
    }
    return true;
  }
  
}
