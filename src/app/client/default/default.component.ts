import { Component, OnInit } from '@angular/core';

import { PuzzleService } from '../shared/services/puzzle.service';

@Component({
    template: `
        <h1 class="cover-heading">Parakeet</h1>
        <p class="lead">
            Parakeet is a free family fued style question and answer game. 
        </p>
        <p class="lead">
           Open a browser on one device (phone, tablet, or laptop) to be the "host" of the game, then open a browser on a second device to display the game board.
        </p>
        <p class="lead">
            <a class="btn btn-lg btn-default" routerLink="/create">New Game</a>
            <a class="btn btn-lg btn-primary" routerLink="/join">Join Game</a>
        </p>
        <p>
            {{puzzleCount}} puzzles
        </p>
    `
})
export class DefaultPageComponent implements OnInit {
    public puzzleCount: number;

    constructor(private service: PuzzleService){}

    ngOnInit(){
        this.service.getPuzzleCount().then(result => {
            this.puzzleCount = result;
        });
    }
}