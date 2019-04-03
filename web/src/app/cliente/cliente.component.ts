import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from "../core/models/usuario.model";
import {StorageService} from "../core/services/storage.service";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public user: UsuarioModel;

  constructor(private storage: StorageService) { }

  ngOnInit() {
    this.user = this.storage.getCurrentUser();
  }

  salir(event:Event):void{
    this.storage.logout();
  }

}
