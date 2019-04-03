import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DepartamentModel} from "../../core/models/departament.model";
import {StorageService} from "../../core/services/storage.service";

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  constructor(private http: HttpClient,
              private storageService: StorageService) { }

  save(name: string): Observable<DepartamentModel>{
    return this.http.post<DepartamentModel>('/api/departament', {name},{headers: {Authorization:'Bearer ' + this.storageService.getCurrentSession().token}})
  }

  getAll(): Observable<DepartamentModel[]>{
    return this.http.get<DepartamentModel[]>('/api/departament/public')
  }

}
