'use strict';

const puzzles = require('./puzzle.data.json');

function getPuzzle(request, reply){
    const test = puzzles[Math.floor(Math.random() * puzzles.length)];
    return reply(test);
}

function getPuzzleCount(request, reply){
    return reply({ count: puzzles.length });
}

module.exports = {
    getPuzzle: getPuzzle,
    getPuzzleCount: getPuzzleCount
};