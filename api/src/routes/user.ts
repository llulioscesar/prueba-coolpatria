import {Route} from './route'
import {UserController} from '../controllers/user'

export class UserRoute extends Route{
    public userController : UserController = new UserController();

    public start(): void{
        this.app.route(this.endPoint)
            .post(this.userController.add);

        this.app.route(this.endPoint + '/admin')
            .post(this.userController.addAdmin);
    }

}