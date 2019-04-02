import {readdirSync} from 'fs'

export class Routes {
    public routes(app):void{
        readdirSync(__dirname).forEach(file => {
            if (file == 'index.ts') return;
            let name = file.substr(0, file.indexOf('.'));
            let nameClass = name.substr(0,1).toUpperCase() + name.substr(1);
            let route = require('./'+name);
            new route[nameClass](app)
        })
    }
}