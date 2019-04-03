import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {StorageService} from "../../core/services/storage.service";
import {CityObjectModel} from "./city-object.model";
import {Observable} from "rxjs";
import {CityModel} from "../../core/models/city.model";
import {CityDepartamentModel} from "../../core/models/city.departament.model";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  save(value: CityObjectModel): Observable<CityModel>{
    return this.http.post<CityModel>('/api/city', value, {headers:{Authorization: 'Bearer ' + this.storageService.getCurrentSession().token}})
  }

  getAllDepartament(): Observable<CityDepartamentModel[]>{
    return this.http.get<CityDepartamentModel[]>('/api/city/departaments', {headers:{Authorization: 'Bearer ' + this.storageService.getCurrentSession().token}})
  }

  getAll(): Observable<CityModel[]>{
    return this.http.get<CityModel[]>('/api/city/public')
  }

}
