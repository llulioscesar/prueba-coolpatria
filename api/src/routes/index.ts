import {CityRouter} from './city'
import {SedeRoute} from "./sede";
import {UserRoute} from './user'
import {DepartamentRoute} from "./departament";

export class Routes {
    public routes(app):void{
        new UserRoute(app, "/user").start();
        new CityRouter(app, '/city').start();
        new SedeRoute(app, '/sede').start();
        new DepartamentRoute(app, '/departament').start();
    }
}