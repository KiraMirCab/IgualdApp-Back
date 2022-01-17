import bodyParser from "body-parser";
import cors from 'cors';
import { Server } from "./clases/Server";
import usuarioRutas from "./rutas/usuario.rutas";

const server = new Server();

server.app.use(bodyParser.urlencoded({limit:'5mb', extended:true}));
server.app.use(bodyParser.json({limit:'5mb'}));
server.app.use(cors({
    origin:true,
    credentials:true
}));

server.app.use('/usuario', usuarioRutas);

server.start(()=>{
    console.log('Servidor iniciando en el puerto ' + server.port);
});