'use strict';

let io;

function register(httpConfig){

    io = require('socket.io')(httpConfig);
    io.on('connection', socket => {

        socket.on('notify', data => {
            io.to(data.room).emit('notification', data.data);    
        });

        socket.on('update', data => {
            console.log('updating', data.room);
            io.to(data.room).emit('update', data.data);
        });

        socket.on('join', room => {
            console.log('joining room', room);
            socket.join(room);
        });

    });

}

module.exports = {
    register: register
};