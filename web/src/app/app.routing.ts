import {RouterModule} from '@angular/router'
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";

const appRoutes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

export  const Routing = RouterModule.forRoot(appRoutes);
