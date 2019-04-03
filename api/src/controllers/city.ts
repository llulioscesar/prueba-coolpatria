import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {CitySchema} from '../models/city'
import {Departament} from "./departament";

export const City = mongoose.model('City', CitySchema);

export class CityController {

    public add(req:Request, res:Response){
        if(req['user'].isAdmin == false){
            return res.status(401).json({
                errmsg: 'No esta autorizado para el este recurso'
            })
        }
        let newCity = new City(req.body);
        newCity.save((err, city) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(city);
        })
    }

    public getAll(req:Request, res: Response){
        if(req['user'].isAdmin == false){
            return res.status(401).json({
                errmsg: 'No esta autorizado para el este recurso'
            })
        }
        City.find().sort({name: 1}).exec((err, citys) => {
            if(err){
                return res.status(500).json(err);
            }
            Departament.populate(citys, {path:'departament'}, (err, deps) => {
                if(err){
                    return res.status(500).json(err)
                }
                res.json(deps)
            })
        })
    }

}