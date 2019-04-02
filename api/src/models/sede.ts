import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const SedeSchema = new Schema({
    name:{
        type: String,
        required: 'Ingrese el nombre de la sede'
    },
    city:{
        type:Schema.ObjectId,
        ref: 'City'
    }
});