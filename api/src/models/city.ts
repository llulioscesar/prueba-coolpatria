import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const CitySchema = new Schema({
    name:{
        type: String,
        required: 'Ingrese el nombre de la ciudad'
    }
});