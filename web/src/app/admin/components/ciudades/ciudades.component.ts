import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {DepartamentService} from "../../shared/departament.service";
import {DepartamentModel} from "../../../core/models/departament.model";
import {CityService} from "../../shared/city.service";
import {CityObjectModel} from "../../shared/city-object.model";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  public form: FormGroup;
  public send: boolean = true;
  public departamentos: DepartamentModel[];
  public dataSource : any;
  public displayedColmns: Array<any> = ['_id', 'name', 'departament.name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private formBuilder: FormBuilder,
              private departamentService: DepartamentService,
              private cityService: CityService) { }

  ngOnInit() {
    this.departamentService.getAll().subscribe(
      data => {
        this.departamentos = data;
      }
    );
    this.cityService.getAllDepartament().subscribe(
      data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
    this.form = new FormBuilder().group({
      name: [''],
      departament: [null]
    })
    this.onChange();
  }

  onChange():void{
    this.form.valueChanges.subscribe(value => {
      if(value.departament == null || value.name == ''){
        this.send = true
      } else {
        this.send = false
      }
    })
  }

  submitNew(){
    this.cityService.save(new CityObjectModel(this.form.value)).subscribe(
      data => {
        let temData = JSON.parse(JSON.stringify(data));
        this.departamentos.forEach(dep => {
          if (dep._id == data.departament){
            temData.departament = dep
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
