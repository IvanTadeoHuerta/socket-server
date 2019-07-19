import { Router, Request, Response} from 'express';
import  Server  from '../classes/server';

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