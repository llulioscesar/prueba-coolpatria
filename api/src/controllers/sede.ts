import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {SedeSchema} from '../models/sede'
import {City} from "./city";

export const Sede = mongoose.model('Sede', SedeSchema);

export class SedeController {

    public add(req:Request, res:Response){
        if(req['user'].isAdmin == false){
            return res.status(401).json({
                errmsg: 'No esta autorizado para el este recurso'
            })
        }
        let newSede = new Sede(req.body);
        newSede.save((err, city) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(city);
        })
    }

    public getAllCities(req:Request, res:Response){
        if(req['user'].isAdmin == false){
            return res.status(401).json({
                errmsg: 'No esta autorizado para el este recurso'
            })
        }
        Sede.find({}, (err, sedes) => {
            if(err){
                res.status(500).json(err)
            }
            City.populate(sedes, {path: 'city'}, (err, citys) => {
                res.json(citys);
            })
        })
    }

    public getAll(req:Request, res:Response){
        Sede.find({}, (err, sedes) => {
            if(err){
                res.status(500).json(err)
            }
            res.json(sedes);
        })
    }

}