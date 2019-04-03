import {Request} from 'express'
export abstract class Route {
    protected app;
    protected endPoint;
    public constructor(app, endPoint){
        this.app = app;
        this.endPoint = endPoint;
    }

}