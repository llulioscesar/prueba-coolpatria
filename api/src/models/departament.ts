import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const DepartamentSchema = new Schema({
    name: {
        type: String,
        required: 'Ingrese el nombre del departamento'
    }
});