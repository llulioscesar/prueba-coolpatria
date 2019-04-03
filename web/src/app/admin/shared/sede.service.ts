import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SedeModel} from "../../core/models/sede.model";
import {StorageService} from "../../core/services/storage.service";
import {SedeCityModel} from "../../core/models/sede.city.model";
import {SedeObjectModel} from "./sede-object.model";

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http : HttpClient,
              private storageService: StorageService) { }

  save(value: SedeObjectModel): Observable<SedeModel>{
    return this.http.post<SedeModel>('/api/sede', value, {headers: {Authorization: 'Bearer ' + this.storageService.getCurrentSession().token}})
  }

  getAllCities(): Observable<SedeCityModel[]>{
    return this.http.get<SedeCityModel[]>('/api/sede/cities', {headers: {Authorization: 'Bearer ' + this.storageService.getCurrentSession().token}})
  }

  getAll(): Observable<SedeModel[]>{
    return this.http.get<SedeModel[]>('/api/sede/public')
  }

}
