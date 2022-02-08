import { Usuario } from './../models/usuario.modelo';
import { Request, Response } from "express";
import { Token } from '../clases/Token';


class usuarioController{
     
    getDatos( req:Request, res:Response){
        console.log(req.query);
        let usuario = req.query.usuario;
        if(usuario){
            return res.status(200).json({
                status:"ok",
                message:"el usuario es "+ usuario
            });
        }
        else {
            return res.status(200).json({
                status:"fail",
                message:"no hay usuario"
            });
        }
    };

    
    crearUsuario(req:Request,res:Response){
        let u = new Usuario();
        u.usuario = req.body.usuario;
        u.email = req.body.email;
        
        //Bcrypt for password:
        const bcrypt = require('bcrypt');
        const password = req.body.pwd;
        u.pwd = bcrypt.hashSync(password, 10);
                
        u.role = ['01'];
        Usuario.create(u,(err, usuarioDB)=>{
            if(err){
                console.log(err);
                throw err;
            }
            else{
                return res.status(200).json({
                    status:'ok',
                    message:'el usuario creado es ' + usuarioDB.usuario,
                    usuario:{
                        _id: usuarioDB._id,
                        usuario: usuarioDB.usuario,
                        email: usuarioDB.email
                    }
                });
            }
        })
    }

    login( req:Request, res:Response){
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;
        const bcrypt = require('bcrypt');

        Usuario.findOne({usuario:usuario},null, null, (err,usuarioDB)=>{
                if (err) {
                    console.log(err);
                    throw err;
                }
                if(usuarioDB){
                    if(bcrypt.compareSync(pwd, usuarioDB.pwd)) {
                        const usuarioQueMAndo = new Usuario();
                        usuarioQueMAndo._id = usuarioDB._id;
                        usuarioQueMAndo.usuario = usuarioDB.usuario;
                        usuarioQueMAndo.role = usuarioDB.role;
                        return res.status(200).json({
                            status: "ok",
                            message: "el usuario es " + usuario +", y la contraseña es correcta",
                            _id:usuarioDB._id,
                            token: Token.generaToken(usuarioQueMAndo)
                        });
                    } else {
                        return res.status(200).json({
                            status: "ok",
                            message: "la contrasena no es correcta"
                        });
                    }
                } else {
                    return res.status(200).json({
                        status: "fail",
                        message: "usuario incorrecto"
                    });
                }
            }
        
        )
    }
}

export default usuarioController;