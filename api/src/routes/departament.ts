import {Route} from './route'
import {DepartamentController} from "../controllers/departament";

export class DepartamentRoute extends Route {

    public departamentController : DepartamentController = new DepartamentController();

    public start():void{

        this.app.route(this.endPoint)
            .get(this.departamentController.getAll)
            .post(this.departamentController.add);
    }

}