"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
const logger = require("morgan");
const mongoose = require("mongoose");
const jwt = require("express-jwt");
exports.JWTSecret = process.env.JWT_SECRET || 'paingain';
class App {
    constructor() {
        this.app = express();
        this.routePrv = new routes_1.Routes();
        this.mongoSetup();
        this.config();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(jwt({ secret: exports.JWTSecret })
            .unless({
            path: [
                '/'
            ]
        }));
    }
    mongoSetup() {
        let user = process.env.DB_USER;
        let pass = process.env.DB_PASS;
        let db = process.env.DB_NAME || 'paingain';
        let host = process.env.DB_HOST || 'localhost';
        let port = process.env.DB_PORT || 27017;
        let url = 'mongodb://';
        if (user != undefined) {
            url = url + user + ':' + pass + '@';
        }
        url = url + host + ':' + port + '/' + db;
        mongoose.promise = global.Promise;
        mongoose.connect(url, { useNewUrlParser: true })
            .then(() => {
            console.log("MongoDB connected");
        })
            .catch(err => {
            console.error(err.name + ": " + err.errmsg);
            process.exit(err.code);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map