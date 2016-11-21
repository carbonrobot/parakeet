'use strict';

const glob = require('glob');

exports.register = function (server, opts, next) {

    // register api routes
    glob('./routes/*.routes.js', { cwd: __dirname }, function(err, matches) {
        matches.forEach(function(filepath) {
            server.route(require(filepath));
        });

        return next();
    });

};

exports.register.attributes = {
    name: 'api',
    version: '1.0.0'
};