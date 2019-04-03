import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SedeUserModel} from "../../core/models/sede.user.model";
import {StorageService} from "../../core/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  find(id:string): Observable<SedeUserModel[]>{
    return this.http.get<SedeUserModel[]>('/api/user/sede/'+id, {headers:{Authorization: 'Bearer ' + this.storageService.getCurrentSession().token}})
  }

}
