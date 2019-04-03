import {Route} from './route'
import {SedeController} from "../controllers/sede";

export class SedeRoute extends Route{

    public sedeController : SedeController = new SedeController();

    public start():void{

        this.app.route(this.endPoint)
            .post(this.sedeController.add);

        this.app.route(this.endPoint + '/public')
            .get(this.sedeController.getAll);

        this.app.route(this.endPoint + '/cities')
            .get(this.sedeController.getAllCities);

    }

}