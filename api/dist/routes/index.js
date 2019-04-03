"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("./contact");
class Routes {
    routes(app) {
        new contact_1.Contact(app);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map