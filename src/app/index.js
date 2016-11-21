'use strict';

const plugins = [
    require('vision'),
    require('inert')
];

exports.register = function(server, opts, next) {

    server.register(plugins, () => {

        // register view engine
        server.views({
            engines: {
                html: require('handlebars')
            },
            relativeTo: 'public',
            path: 'views',
            isCached: false
        });

        // assets
        server.route({
            method: 'GET',
            path: '/public/{path*}',
            handler: {
                directory: {
                    path: './',
                    index: true
                }
            },
            config: {
                cache: {
                    expiresIn: 1000 * 60 * 60 * 24 * 365 * 10 // 10yrs
                }
            }
        });

        // register routes
        server.route({
            method: 'GET',
            path: '/{path*}',
            handler: {
                view: 'index'
            }
        });

        next();

    });

};

exports.register.attributes = {
    name: 'app',
    version: '1.0.0'
};