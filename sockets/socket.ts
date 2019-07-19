import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuarioLita } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectado = new UsuarioLita();

export const connectarCliente = (cliente: Socket, io: socketIO.Server) => {

    const usuario = new Usuario(cliente.id);

    usuariosConectado.agregar(usuario);

}

export const desconectar = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('disconnect', () => {

        usuariosConectado.borrarUusuario(cliente.id);

        io.emit('usuarios-activos', usuariosConectado.getLita());

    });

};

// Escuchar mensaje
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);
    });

};

// Escuchar mensaje
export const configLogin = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectado.actualizarNombre(cliente.id, payload.nombre);
        // io.emit('configurar-usuario', payload);
        io.emit('usuarios-activos', usuariosConectado.getLita());

        callback({
            ok: true,
            mensaje: 'Usuario ' + payload + ' configurado'
        });
    });

};


// Escuchar mensaje
export const obtenerUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        io.to( cliente.id ).emit('usuarios-activos', usuariosConectado.getLita());

    });

};