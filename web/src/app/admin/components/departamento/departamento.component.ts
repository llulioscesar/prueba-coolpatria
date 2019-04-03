import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatInput, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DepartamentService} from "../../shared/departament.service";
import {DepartamentModel} from "../../../core/models/departament.model";

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  public depForm : FormGroup;
  public send : boolean = true;
  public dataSource : any;
  public displayedColmns: Array<string> = ['_id', 'name'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private formBuilder: FormBuilder,
              private departamentService: DepartamentService) { }

  ngOnInit() {
    this.load();
    this.depForm = this.formBuilder.group({
      name: ['']
    });
    this.onChangeName();
  }

  onChangeName():void{
    this.depForm.get("name").valueChanges.subscribe(value => {
      if (value !== ''){
        this.send = false
      }else {
        this.send = true;
      }
    })
  }

  load(){
    this.departamentService.getAll().subscribe(
      data => {
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  submitNew(){
    this.departamentService.save(this.depForm.value.name).subscribe(
      data =>{
        let tem = JSON.parse(JSON.stringify(this.dataSource.data));
        tem.push(data);
        this.dataSource.data = tem;
        this.dataSource.sort = this.sort;
        this.depForm.reset();
      },
      err => {
        console.log(err);
      }
    )
  }

  applyFilter(value: string){
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value
  }

}
