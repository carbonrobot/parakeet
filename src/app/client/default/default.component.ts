import { Component } from '@angular/core';

@Component({
    selector: 'lp',
    template: '<button routerLink="/create">New Game</button><button routerLink="/join">Join Game</button>'
})
export class DefaultPageComponent { }