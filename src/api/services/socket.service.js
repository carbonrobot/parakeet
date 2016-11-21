'use strict';

let io;

function register(httpConfig){

    io = require('socket.io')(httpConfig);
    io.on('connection', socket => {
        console.log('client connected');     

        socket.on('notify', data => {
            console.log('server recvd notify', data);
            io.emit('notification', { msg: data });    
        });

    });

}

module.exports = {
    register: register
};