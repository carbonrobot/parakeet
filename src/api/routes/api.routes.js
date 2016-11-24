'use strict';

const controller = require('../controllers/api.controller');

module.exports = [
    {
        method: 'GET',
        path: '/api/puzzle',
        handler: controller.getPuzzle
    },
    {
        method: 'GET',
        path: '/api/puzzle/count',
        handler: controller.getPuzzleCount
    }
];