import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CityService} from "../../shared/city.service";
import {SedeService} from "../../shared/sede.service";
import {CityModel} from "../../../core/models/city.model";
import {SedeObjectModel} from "../../shared/sede-object.model";
import {DepartamentModel} from "../../../core/models/departament.model";
import {DepartamentService} from "../../shared/departament.service";

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.component.html',
  styleUrls: ['./sedes.component.css']
})
export class SedesComponent implements OnInit {

  public form: FormGroup;
  public send: boolean = true;
  public departamentos: DepartamentModel[] = [];
  public ciudades: CityModel[] = [];
  public mCiudades: CityModel[] = [];
  public dataSource : any;
  public displayedColmns: Array<any> = ['_id', 'name', 'city'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private formBuilder: FormBuilder,
              private departamentService:DepartamentService,
              private sedeService: SedeService,
              private cityService: CityService) { }

  ngOnInit() {
    this.cityService.getAll().subscribe(
      data => {
        this.ciudades = data;
      }
    );
    this.departamentService.getAll().subscribe(
      data => {
        this.departamentos = data;
      }
    )
    this.sedeService.getAllCities().subscribe(
      data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
    this.form = new FormBuilder().group({
      name: [''],
      city: [null],
      dep: [null]
    });
    this.onChange();
  }

  onChange():void{
    this.form.valueChanges.subscribe(value => {
      if(value.dep == null){
        this.mCiudades = [];
      }else {
        let temp: CityModel[] = [];
        this.ciudades.forEach(city => {
          if(city.departament == value.dep){
            temp.push(city);
          }
        });
        this.mCiudades = temp;
      }
      if(this.mCiudades.length == 0){
        value.city = null;
      }
      if(value.city == null || value.name == ''){
        this.send = true
      } else {
        this.send = false
      }
    })
  }

  submitNew(){
    this.sedeService.save(new SedeObjectModel(this.form.value)).subscribe(
      data => {
        let temData = JSON.parse(JSON.stringify(data));
        this.ciudades.forEach(dep => {
          if (dep._id == data.city){
            temData.city = dep
          }
        });
        let tem = JSON.parse(JSON.stringify(this.dataSource.data));
        tem.push(temData);
        this.dataSource.data = tem;
        this.dataSource.sort = this.sort;
        this.form.reset();
      },
      err => {
        window.alert(err.error.errmsg)
      }
    )
  }

  applyFilter(value: string){
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value
  }

}
