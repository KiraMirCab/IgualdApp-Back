import { Usuario } from './../models/usuario.modelo';
import { Request, Response } from "express";

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
        u.pwd = req.body.pwd;
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
                    usuario:usuarioDB
                });
            }
        })
    }


    login( req:Request, res:Response){
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;
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
}

export default usuarioController;