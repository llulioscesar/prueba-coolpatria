import {Request, Response} from 'express'
import {ContactController} from '../controllers/crmController'

export class Contact {
    public contactController: ContactController = new ContactController();

    constructor(app){
        app.route('/')
            .get((req:Request, res:Response) => {
                res.status(200).send({
                    message: 'GET request sucess full!'
                })
            });

        app.route('/contact')
            .get((req:Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request sucess full!'
                })
            })
            .post(this.contactController.addNewContact);

        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact)
    }
}