import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        <h1 class="cover-heading">Join Game</h1>
        <p class="lead">To join a game, ask the host for the game key.</p>

        <form class="form-inline">
            <div class="form-group">
                <label class="sr-only" for="gamekey">Email address</label>
                <input class="form-control" [(ngModel)]="gameKey" type="text" name="gamekey" />
            </div>
            <button class="btn btn-success" (click)="join()">Join Game</button>
        </form>
    `
})
export class JoinPageComponent {
    public gameKey: string;

    constructor(private router: Router){}

    public join(){
        // TODO: check if null
        // TODO: verify its an active host key
        this.router.navigate(['/player', this.gameKey]);
    }
}