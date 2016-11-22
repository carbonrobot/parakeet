'use strict';

const puzzles = require('./puzzle.data.js');

function getPuzzle(request, reply){
    const test = puzzles[getRandomInt(0, puzzles.length)];
    return reply(test);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    getPuzzle: getPuzzle
};