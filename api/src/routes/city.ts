import {Route} from './route'
import {CityController} from '../controllers/city'

export class CityRouter extends Route {

    public cityController : CityController = new CityController();

    public start():void{
        this.app.route(this.endPoint)
            .post(this.cityController.add);

        this.app.route(this.endPoint + '/public')
            .get(this.cityController.getAll);

        this.app.route(this.endPoint + '/departaments')
            .get(this.cityController.getAllDepartaments);
    }

}