import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {UserSchema} from '../models/user'
import * as bcrypt from 'bcrypt'

const User = mongoose.model('User', UserSchema);
const saltRound : number = 10;

export class UserController {

    public addAdmin(req: Request, res: Response){
        let newUser = new User(req.body);
        newUser.isAdmin = true;
        if (newUser.password != undefined){
            newUser.password = bcrypt.hashSync(newUser.password, saltRound);
        }
        newUser.save((err, user) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(user);
        })
    }

    public add(req: Request, res: Response){
        let newUser = new User(req.body);
        newUser.isAdmin = false;
        if (newUser.password != undefined){
            newUser.password = bcrypt.hashSync(newUser.password, saltRound);
        }
        newUser.save((err, user) => {
            if(err){
                res.status(500).json(err);
            }
            res.json(user);
        })
    }

}