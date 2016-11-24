import { Component } from '@angular/core';

@Component({
    template: `
        <h1 class="cover-heading">Parakeet</h1>
        <p class="lead">
            Parakeet is a free family fued style question and answer game. 
        </p>
        <p>
           Open a browser on one device (phone, tablet, or laptop) to be the "host" of the game, then open a browser on a second device to display the game board.
        </p>
        <p class="lead">
            <a class="btn btn-lg btn-default" routerLink="/create">New Game</a>
            <a class="btn btn-lg btn-primary" routerLink="/join">Join Game</a>
        </p>
    `
})
export class DefaultPageComponent { }