import * as mongoose from 'mongoose'
import {Request, Response} from 'express'
import {UserSchema} from '../models/user'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import {JWTSecret} from "../app";

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

    public identify(req:Request, res:Response){
        User.findOne({email: req.body.email}, (err, user) => {
            if(err){
                res.status(500).json(err)
            }
            if (user){
                const isPass = bcrypt.compareSync(req.body.password, user.password);
                if(!isPass){
                    return res.status(401).json({
                        errmsg:'La contraseña no coincide'
                    })
                }
                user.password = "";
                let token = jwt.sign({
                    id: user._id,
                    admin: user.isAdmin
                }, JWTSecret, {algorithm : 'HS256'});
                return res.json({
                    token,
                    user
                })
            }
            res.status(401).json({
                errmsg: 'No existe el usuario'
            })
        })
    }

}