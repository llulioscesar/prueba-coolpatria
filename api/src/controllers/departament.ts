import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {DepartamentSchema} from '../models/departament'

export const Departament = mongoose.model('Departament', DepartamentSchema);

export class DepartamentController {

    public add(req:Request, res:Response){
        if(req['user'].isAdmin === false){
            return res.status(401).json({
                errmsg: 'No esta autorizado para el este recurso'
            })
        }
        let newDep = new Departament(req.body);
        newDep.save((err, dep) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(dep);
        })
    };

    public getAll(req: Request, res:Response){
        Departament.find().sort({name:1}).exec((err, deps) => {
            if(err){
                return res.status(500).json(err);
            }
            res.json(deps)
        })
    };

}