import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLita } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectado = new UsuarioLita();

export const connectarCliente = ( cliente: Socket) =>{

    const usuario = new Usuario( cliente.id );

    usuariosConectado.agregar( usuario );


}

export const desconectar = ( cliente: Socket) =>{

    cliente.on('disconnect', ()=>{
        usuariosConectado.borrarUusuario( cliente.id );
    });

};

// Escuchar mensaje
export const mensaje = ( cliente: Socket, io: socketIO.Server ) =>{

    cliente.on('mensaje', (payload: {de:string, cuerpo: string})=>{
        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });

};

// Escuchar mensaje
export const configLogin = ( cliente: Socket, io: socketIO.Server ) =>{

    cliente.on('configurar-usuario', (payload: { nombre: string}, callback: Function)=>{

        usuariosConectado.actualizarNombre( cliente.id, payload.nombre );
        io.emit('configurar-usuario', payload);

        callback({
            ok: true,
            mensaje: 'Usuario ' + payload + ' configurado'
        });
    });

};
