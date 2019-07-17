import { Router, Request, Response} from 'express';

export const router = Router();

router.get('/mensajes', ( req: Request, resp: Response ) =>{

    resp.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });


});


router.post('/mensajes/:id', ( req: Request, resp: Response ) =>{

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const parametro = req.params.id;

    resp.json({
        ok: true,
        cuerpo,
        de,
        parametro
    });


});