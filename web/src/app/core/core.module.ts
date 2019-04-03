import {NgModule, Optional, SkipSelf} from "@angular/core";
import {StorageService} from "./services/storage.service";
import {AuthorizatedGuard} from "./guards/authorizated.guard";
import {NoAuthorizatedGuard} from "./guards/no-authorizated.guard";

@NgModule({
  declarations:[],
  imports:[],
  providers:[
    StorageService,
    AuthorizatedGuard,
    NoAuthorizatedGuard
  ],
  bootstrap:[]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule){
      throw new Error('CoreModule ya está cargado. Importa solo en el AppModule')
    }
  }

}
