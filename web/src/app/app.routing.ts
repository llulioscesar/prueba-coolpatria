import {RouterModule} from '@angular/router'
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthorizatedGuard} from "./core/guards/authorizated.guard";
import {NoAuthorizatedGuard} from "./core/guards/no-authorizated.guard";
import {CiudadesComponent} from "./admin/components/ciudades/ciudades.component";
import {SedesComponent} from "./admin/components/sedes/sedes.component";
import {DepartamentoComponent} from "./admin/components/departamento/departamento.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./admin/components/home/home.component";
import {ClienteComponent} from "./cliente/cliente.component";

const appRoutes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthorizatedGuard]
  },
  {
    path: 'registro',
    component: RegisterComponent,
    canActivate: [NoAuthorizatedGuard]
  },
  {
    path: 'cliente',
    component: ClienteComponent,
    canActivate: [AuthorizatedGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthorizatedGuard],
    children:[
      {
        path:'',
        component: HomeComponent
      },
      {
        path: 'ciudades',
        component: CiudadesComponent
      },
      {
        path: 'sedes',
        component: SedesComponent
      },
      {
        path: 'departamentos',
        component: DepartamentoComponent
      }
    ]
  }
];

export const Routing = RouterModule.forRoot(appRoutes);
