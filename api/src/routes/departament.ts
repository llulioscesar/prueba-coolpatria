import {Route} from './route'
import {DepartamentController} from "../controllers/departament";

export class DepartamentRoute extends Route {

    public departamentController : DepartamentController = new DepartamentController();

    public start():void{

        this.app.route(this.endPoint)
            .post(this.departamentController.add);

        this.app.route(this.endPoint + '/public')
            .get(this.departamentController.getAll);
    }

}