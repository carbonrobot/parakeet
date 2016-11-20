'use strict';

exports.register = function (server, opts, next) {

    // register routes
    server.route({
        method: 'GET',
        path: '/api',
        handler: function(req, res){
            res.ok();
        }
    });

    next();

};

exports.register.attributes = {
    name: 'api',
    version: '1.0.0'
};