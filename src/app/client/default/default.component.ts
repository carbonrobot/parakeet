import { Component } from '@angular/core';

@Component({
    template: `
        <h1 class="cover-heading">Parakeet</h1>
        <p class="lead">
            Parakeet is a family fued style question and answer game. Use one browser as the "host" of the game and another browser to display the game board.
        </p>
        <p class="lead">
            <a class="btn btn-lg btn-default" routerLink="/create">New Game</a>
            <a class="btn btn-lg btn-primary" routerLink="/join">Join Game</a>
        </p>
    `
})
export class DefaultPageComponent { }