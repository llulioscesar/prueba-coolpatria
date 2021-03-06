import * as express from 'express'
import {Routes} from './routes'
import * as logger from 'morgan'
import * as mongoose from 'mongoose'
import * as jwt from 'express-jwt'

export const JWTSecret = process.env.JWT_SECRET || 'paingain';

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();

    constructor(){
        this.mongoSetup();
        this.config();
        this.routePrv.routes(this.app);
    }

    private config() : void {
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(jwt({secret:JWTSecret})
            .unless({
                path:[
                    '/user/login',
                    '/user/register',
                    '/user/admin',
                    'auth/renovar',
                    '/sede/public',
                    '/city/public',
                    '/departament/public'
                ]
            })
        );
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({
                errmsg: err.message
            });
        });
    }

    private mongoSetup(): void{

        let user = process.env.DB_USER || 'root';
        let pass = process.env.DB_PASS || 'root';
        let db = process.env.DB_NAME || 'paingain';
        let host = process.env.DB_HOST || 'localhost';
        let port = process.env.DB_PORT || 27017;

        let url = 'mongodb://';
        if (user != undefined){
            url = url + user + ':' + pass + '@';
        }
        url = url + host + ':' + port + '/' + db + "?authSource=admin";

        mongoose.promise = global.Promise;
        mongoose.connect(url, { useNewUrlParser: true })
            .then(() => {
                console.log("MongoDB connected");
            })
            .catch(err => {
                console.error(err.name + ": " + err.errmsg);
                process.exit(err.code);
            })
    }

}

export default new  App().app;