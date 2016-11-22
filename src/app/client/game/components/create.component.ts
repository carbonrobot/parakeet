import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../services/game.service';

@Component({
    template: `
        <h1 class="cover-heading">Create Game</h1>
        <p class="lead">Enter team names and click start to create a new game.</p>
        <form class="form-horizontal col-sm-offset-2">
            <div class="form-group">
                <label for="team1Name" class="col-sm-2 control-label">Team 1</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="team1Name" [(ngModel)]="team1Name"/>
                </div>
            </div>
            <div class="form-group">
                <label for="team2Name" class="col-sm-2 control-label">Team 2</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" name="team2Name" [(ngModel)]="team2Name"/>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-10">
                    <a class="btn btn-success" (click)="start()">Start Game</a>
                </div>
            </div>
        </form>
    `
})
export class CreatePageComponent {
    private team1Name: string = 'Pigs';
    public team2Name: string = 'Cows';

    constructor(private router: Router, private service: GameService) {}

    public start() {
        this.service.startNewGame(this.team1Name, this.team2Name);
        this.router.navigate(['/host', this.service.data.key]);
    }
}