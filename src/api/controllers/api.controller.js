'use strict';

const puzzles = require('./puzzle.data.json');

function getPuzzle(request, reply){
    const test = puzzles[Math.floor(Math.random() * puzzles.length)];
    return reply(test);
}

module.exports = {
    getPuzzle: getPuzzle
};