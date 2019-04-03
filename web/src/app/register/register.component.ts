import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartamentModel} from "../core/models/departament.model";
import {CityModel} from "../core/models/city.model";
import {SedeModel} from "../core/models/sede.model";
import {DepartamentService} from "../admin/shared/departament.service";
import {CityService} from "../admin/shared/city.service";
import {SedeService} from "../admin/shared/sede.service";
import {RegisterService} from "./shared/register.service";
import {RegisterObjectModel} from "./shared/register-object.model";
import {Router} from "@angular/router";

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
              private sedeService: SedeService,
              private registerService: RegisterService,
              private router: Router) { }

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
    );
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
    this.form.get('dep').valueChanges.subscribe(value => {
      this.mCiudad = [];
      this.mSede = [];
      if (value != null){
        this.ciudades.forEach(city => {
          if(value == city.departament){
            this.mCiudad.push(city);
          }
        })
      }
    });

    this.form.get('city').valueChanges.subscribe(value => {
      this.mSede = [];
      if(value != null){
        this.sedes.forEach(sede => {
          if(value == sede.city){
            this.mSede.push(sede);
          }
        })
      }
    });

    this.form.valueChanges.subscribe(value => {
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
    this.registerService.send(new RegisterObjectModel(this.form.value)).subscribe(
      data => {
        window.alert("Se ha registrado correctamente");
        this.router.navigate(['']);
      },
      err => {
        window.alert(err.error.errmsg);
      }
    )
  }

}
