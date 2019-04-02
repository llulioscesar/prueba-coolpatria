import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {CitySchema} from '../models/city'

const City = mongoose.model('City', CitySchema);

export class CityController {

    public add(req:Request, res:Response){
        let newCity = new City(req.body);
        newCity.save((err, city) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(city);
        })
    }

}