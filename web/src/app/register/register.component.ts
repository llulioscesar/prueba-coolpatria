import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartamentModel} from "../core/models/departament.model";
import {CityModel} from "../core/models/city.model";
import {SedeModel} from "../core/models/sede.model";
import {DepartamentService} from "../admin/shared/departament.service";
import {CityService} from "../admin/shared/city.service";
import {SedeService} from "../admin/shared/sede.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public send: boolean = true;
  public form: FormGroup;
  public submitted: Boolean = false;
  public error:{code: number, errmsg: string} = null;
  public departamentos : DepartamentModel[] = [];
  public ciudades : CityModel[] = [];
  public mCiudad: CityModel[] = [];
  public sedes : SedeModel[] = [];
  public mSede : SedeModel[] = [];
  public valid = {
    email: true,
    password1: true,
    password2: true,
    document: true,
    name: true
  };

  constructor(private formBuilder: FormBuilder,
              private departamentService: DepartamentService,
              private cityService: CityService,
              private sedeService: SedeService) { }

  ngOnInit() {
    this.departamentService.getAll().subscribe(
      data => {
        this.departamentos = data;
      }
    );
    this.cityService.getAll().subscribe(
      data => {
        this.ciudades = data;
      }
    );
    this.sedeService.getAll().subscribe(
      data => {
        this.sedes = data;
      }
    )
    this.form = new FormBuilder().group({
      email: [''],
      password1: [''],
      password2: [''],
      dep: [null],
      city: [null],
      sede: [null],
      name: [''],
      document: ['']
    })
    this.onChange()
  }

  onChange():void{
    this.form.valueChanges.subscribe(value => {
      console.log(value);
      if(value.dep == null){
        value.city = null;
        value.sede = null;
        this.mCiudad = [];
        this.mSede = [];
      } else {
        let temp : CityModel[] = [];
        this.ciudades.forEach(city => {
          if(city.departament == value.dep){
            temp.push(city);
          }
        });
        this.mCiudad = temp;
      }
      if(value.city == null){
        value.sede = null;
        this.mCiudad = [];
        this.mSede = [];
      } else {
        let temp : SedeModel[] = [];
        this.sedes.forEach(sede => {
          if (sede.city == value.city){
            temp.push(sede);
          }
        });
        this.mSede = temp;
      }
      if(this.mCiudad.length == 0){
        value.city = null;
        value.sede = null;
        this.mSede = [];
      }
      if(this.mSede.length == 0){
        value.sede = null;
      }
      if(value.name == '' || value.email == '' || value.document == '' || value.dep == null || value.city == null || value.sede == null || value.password1 == '' || value.password2 == ''){
        this.send = true
      } else if(value.password1 !== value.password2){
        this.send = true
      } else {
        this.send = false;
      }
    })
  }

  submit():void{
    console.log("enviar")
  }

}
