import {Route} from './route'
import {SedeController} from "../controllers/sede";

export class SedeRoute extends Route{

    public sedeController : SedeController = new SedeController();

    public start():void{

        this.app.route(this.endPoint)
            .post(this.sedeController.add)
            .get(this.sedeController.getAll);

    }

}