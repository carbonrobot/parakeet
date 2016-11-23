'use strict';

const Hapi = require('hapi');
const Path = require('path');
const api = require('./api');
const app = require('./app');

const server = new Hapi.Server();
server.connection({
        port: process.env.PORT || 3400,
        router: {
            stripTrailingSlash: true
        },
        routes: {
            files: {
                // serves static content files from this directory
                relativeTo: Path.join(process.cwd(), 'public')
            }
        }
    });

const plugins = [api, app];
server.register(plugins, err => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('[hapi] started at:', server.info.uri);
    });
    
});
