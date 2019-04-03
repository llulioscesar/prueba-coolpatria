import {Route} from './route'
import {CityController} from '../controllers/city'

export class CityRouter extends Route {

    public cityController : CityController = new CityController();

    public start():void{
        this.app.route(this.endPoint)
            .get(this.cityController.getAll)
            .post(this.cityController.add);
    }

}