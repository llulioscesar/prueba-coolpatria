import {RouterModule} from '@angular/router'
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthorizatedGuard} from "./core/guards/authorizated.guard";
import {NoAuthorizatedGuard} from "./core/guards/no-authorizated.guard";

const appRoutes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthorizatedGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthorizatedGuard]
  }
];

export  const Routing = RouterModule.forRoot(appRoutes);
