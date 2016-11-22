'use strict';

let io;

function register(httpConfig){

    io = require('socket.io')(httpConfig);
    io.on('connection', socket => {
        console.log('client connected');     

        socket.on('notify', data => {
            io.emit('notification', { data: data });    
        });

        socket.on('update', data => {
            io.emit('update', { data: data });
        });

    });

}

module.exports = {
    register: register
};