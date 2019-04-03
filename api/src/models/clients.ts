import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const ClientsSchema = new Schema({
    user:{
        type:Schema.ObjectId,
        ref: 'User',
        required: 'Ingrese el cliente'
    },
    sede:{
      type: Schema.ObjectId,
      ref:'Sede',
      required: 'Ingrese la sede'
    }
});