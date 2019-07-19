import { Router, Request, Response} from 'express';
import  Server  from '../classes/server';
import { usuariosConectado } from '../sockets/socket';

export const router = Router();

router.get('/mensajes', ( req: Request, resp: Response ) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload );


    resp.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });


});


router.post('/mensajes/:id', ( req: Request, resp: Response ) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const parametro = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    };

    server.io.in( parametro ).emit( 'mensaje-privado', payload );

    resp.json({
        ok: true,
        cuerpo,
        de,
        parametro
    });


});

router.get('/usuarios', ( req: Request, resp: Response ) =>{

    const server = Server.instance;

    server.io.clients( (err:any, clientes: any)=>{

        if( err ){
            return resp.json({
                ok: false,
                err
            });
        }

        return resp.json({
            ok: true,
            clientes
        });

    });

});

//Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, resp: Response ) =>{


    return resp.json({
        ok: true,
        clientes: usuariosConectado.getLita()
    });

});
