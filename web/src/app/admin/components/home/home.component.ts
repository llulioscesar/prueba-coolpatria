import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartamentModel} from "../../../core/models/departament.model";
import {CityModel} from "../../../core/models/city.model";
import {SedeModel} from "../../../core/models/sede.model";
import {DepartamentService} from "../../shared/departament.service";
import {CityService} from "../../shared/city.service";
import {SedeService} from "../../shared/sede.service";
import {HomeService} from "../../shared/home.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SedeUserModel} from "../../../core/models/sede.user.model";
import {UsuarioModel} from "../../../core/models/usuario.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public departamentos: DepartamentModel[] = [];
  public ciudades: CityModel[] = [];
  public sedes: SedeModel[] = [];
  public mCiudades: CityModel[] = [];
  public mSedes: SedeModel[] = [];
  public form: FormGroup;
  public users: SedeUserModel[] = [];
  public dataSource : any;
  public displayedColmns: Array<any> = ['_id', 'document', 'name', 'email', 'created_date'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

    constructor(private departamentService: DepartamentService,
                private cityService: CityService,
                private sedeService: SedeService,
                private homeService: HomeService) { }

  ngOnInit() {
      this.departamentService.getAll().subscribe(data => {
        this.departamentos = data;
      });
      this.cityService.getAll().subscribe(data => {
        this.ciudades = data;
      });
      this.sedeService.getAll().subscribe(data => {
        this.sedes = data;
      });
      this.form = new FormBuilder().group({
        dep: [null],
        city:[null],
        sede:[null]
      });
      this.onChange();
      this.dataSource = new MatTableDataSource();
  }

  onChange():void{
    this.form.get('dep').valueChanges.subscribe(value => {
      this.mCiudades = [];
      this.mSedes = [];
      if (value != null){
        this.ciudades.forEach(city => {
          if(value == city.departament){
            this.mCiudades.push(city);
          }
        })
      }
    });

    this.form.get('city').valueChanges.subscribe(value => {
      this.mSedes = [];
      if(value != null){
        this.sedes.forEach(sede => {
          if(value == sede.city){
            this.mSedes.push(sede);
          }
        })
      }
    });

    this.form.get('sede').valueChanges.subscribe(value => {
      if(value !== 'null'){
        this.homeService.find(value).subscribe(data => {
          this.users = data;
          let tem : UsuarioModel[] = [];
          this.users.forEach(sede => {
            tem.push(sede.user)
          });
          console.log(tem);
          this.dataSource.data = tem;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      }
    })
  }

  applyFilter(value: string){
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value
  }

}
