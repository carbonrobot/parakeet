import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        <h1 class="cover-heading">Join Game</h1>
        <p class="lead">To join a game, ask the host for the game key.</p>

        <form class="form-inline">
            <div class="form-group">
                <label class="sr-only" for="gameKey">Email address</label>
                <input class="form-control upper" [(ngModel)]="gameKey" type="text" name="gameKey" />
            </div>
            <button type="button" class="btn btn-success" (click)="join()" [disabled]="gameKey">Join Game</button>
        </form>
    `
})
export class JoinPageComponent {
    public gameKey: string;

    constructor(private router: Router){}

    public join(){
        const key = this.gameKey.toUpperCase();
        this.router.navigate(['/player', key]);
    }
}