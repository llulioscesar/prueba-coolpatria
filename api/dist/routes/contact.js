"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
const route_1 = require("./route");
class Contact extends route_1.Route {
    constructor() {
        super(...arguments);
        this.contactController = new crmController_1.ContactController();
    }
    start() {
        this.app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request sucess full!'
            });
        });
        this.app.route('/contact')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request sucess full!'
            });
        })
            .post(this.contactController.addNewContact);
        this.app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map