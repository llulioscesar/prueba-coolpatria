import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "./shared/authentication.service";
import {StorageService} from "../core/services/storage.service";
import {Router} from "@angular/router";
import {SesionModel} from "../core/models/sesion.model";
import {LoginObjectModel} from "./shared/login-object.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public error:{code: number, errmsg: string} = null;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private storage: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  public submitLogin():void{
    this.submitted = true;
    this.error = null;
    if(this.loginForm.valid){
      this.auth.login(new LoginObjectModel(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error.error;
          window.alert(this.error.errmsg);
          console.log(error)
        }
      )
    }
  }

  private correctLogin(data:SesionModel){
    this.storage.setCurrentSession(data);
    let path = (data.user.isAdmin == true ? 'admin': 'cliente') || '';
    this.router.navigate([path]);
  }

}
