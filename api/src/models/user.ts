import * as mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    name:{
        type: String,
        required: 'Ingrese el nombre y apellido'
    },
    document:{
        type: String,
        required: 'Ingrese el numero de documento de identificacion',
        unique: true
    },
    email:{
        type: String,
        required: 'Ingrese una direccion de correo',
        unique: true,
        trim: true,
        lowercase: true,
        validate: [email => {
            let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email);
        }, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Ingrese una direccion de correo valida']
    },
    password:{
        type: String,
        required: 'Ingrese una contraseña'
    },
    created_date:{
        type: Date,
        default: Date.now
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});