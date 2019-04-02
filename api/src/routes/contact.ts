import {Request, Response} from 'express'
import {ContactController} from '../controllers/crmController'
import {Route} from './route'

export class Contact extends Route{

    public contactController: ContactController = new ContactController();

    public start():void{
        this.app.route('/')
            .get((req:Request, res:Response) => {
                res.status(200).send({
                    message: 'GET request sucess full!'
                })
            });

        this.app.route('/contact')
            .get((req:Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request sucess full!'
                })
            })
            .post(this.contactController.addNewContact);

        this.app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }
}