import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: '<input [(ngModel)]="gameKey" type="text"/><button (click)="join()">Join Game</button>'
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