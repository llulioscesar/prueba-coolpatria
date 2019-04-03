import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {ClientsSchema} from "../models/clients";
import {User} from "./user";

export const Client = mongoose.model('Client', ClientsSchema);

export class ClientController {

    public getClientOfSede(req:Request, res: Response){
        Client.find({sede:{$eq:req.params.id}}, (err, clients) => {
            if(err){
                return res.status(500).json(err);
            }
            User.populate(clients, {path: 'user', select: '-password'},(err, users) => {
                if(err){
                    return res.status(500).json(err);
                }
                return res.json(users);
            })

        })
    }

}

