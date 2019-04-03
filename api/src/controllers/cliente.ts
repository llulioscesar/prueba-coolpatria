import * as mongoose from 'mongoose'
import {ClientsSchema} from "../models/clients";

export const Client = mongoose.model('Client', ClientsSchema);

export class ClientController {

}

