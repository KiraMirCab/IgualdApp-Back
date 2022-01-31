import { IUsuario } from './../dist/interfaces/usuario.interface';
import { model, Schema } from "mongoose";

const usuarioSchema = new Schema<IUsuario>({
    usuario: {type:String, unique:true, uniqueCaseInsensitive:true,trim:true},
    email: {type:String, unique:true, uniqueCaseInsensitive:true,trim:true},
    pwd: {type:String},
    role: [{type:String}]
})

export const Usuario = model<IUsuario>('usuario', usuarioSchema);