'use strict';

let io;

function register(httpConfig){

    io = require('socket.io')(httpConfig);
    io.on('connection', socket => {

        socket.on('notify', data => {
            io.to(data.room).emit('notification', data.data);    
        });

        socket.on('update', data => {
            io.to(data.room).emit('update', data.data);
        });

        socket.on('strike', data => {
            console.log('strikr', data.room, data.data);
            io.to(data.room).emit('strike', data.data);
        });

        socket.on('join', room => {
            socket.join(room);
        });

    });

}

module.exports = {
    register: register
};