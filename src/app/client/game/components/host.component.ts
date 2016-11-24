import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocketService } from '../services/socketio.service';
import { GameService } from '../services/game.service';

import { Game } from '../models/game.model';

@Component({
    template: `
        <div *ngIf="gameData">
            <p class="lead" *ngIf="!gameData.puzzle">Provide this key <strong>{{gameData.key}}</strong> to another browser window to display the gameboard.</p>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 team-name">{{gameData.team1.name}}</div>
                    <div class="col-xs-3 col-sm-1 team-score">{{gameData.team1.score}}</div>
                    <div class="col-xs-6 col-sm-3 text-right"><strike-zone [team]="gameData.team1"></strike-zone></div>
                    <div class="col-xs-3 col-sm-2 text-right"><button type="button" class="btn btn-danger" (click)="strike(1)">XXX</button></div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6 team-name">{{gameData.team2.name}}</div>
                    <div class="col-xs-3 col-sm-1 team-score">{{gameData.team2.score}}</div>
                    <div class="col-xs-6 col-sm-3 text-right"><strike-zone [team]="gameData.team2"></strike-zone></div>
                    <div class="col-xs-3 col-sm-2 text-right"><button type="button" class="btn btn-danger" (click)="strike(2)">XXX</button></div>
                </div>
                <div class="row">
                    <div class="col-sm-offset-9 col-sm-3 text-right"><a class="btn btn-info" (click)="newPuzzle()">New Puzzle</a></div>
                </div>
            </div>
            
            <div *ngIf="gameData.puzzle" class="container-fluid">
                <p>{{gameData.puzzle.question}}<p>

                <div class="row">
                    <div *ngFor="let item of gameData.puzzle.keys let idx=index" class="col-sm-12">
                        <div class="row puzzle-box">
                            <div class="col-xs-12 col-sm-7 puzzle-answer">{{item.d}}</div>
                            <div class="col-xs-2 col-sm-1 puzzle-pct">{{item.p}}</div>
                            <div class="col-xs-10 col-sm-4 puzzle-actions">
                                <button type="button" class="btn btn-default" (click)="select(idx, 1)" [disabled]="item.team === 1">Team 1</button>
                                <button type="button" class="btn btn-default" (click)="select(idx, 2)" [disabled]="item.team === 2">Team 2</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HostPageComponent implements OnInit {

    public gameData: Game;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private socket: SocketService,
        private service: GameService) {

        this.gameData = service.data;
    }

    newPuzzle() {
        this.service.getNewPuzzle().then(() => {
            this.gameData.team1.strikes = 0;
            this.gameData.team2.strikes = 0;
            this.updatePlayers.call(this);
        });
    }

    select(idx: number, team: number) {
        this.gameData.puzzle.keys[idx].team = team;
        this.gameData['team' + team].score += this.gameData.puzzle.keys[idx].p;
        this.updatePlayers.call(this);
    }

    strike(team: number) {
        if (this.gameData['team' + team].strikes < 3) {
            this.gameData['team' + team].strikes += 1;
        }
        this.updatePlayers.call(this);
        this.socket.strike(this.gameData['team' + team].strikes);
    }

    ngOnInit() {
        if (this.gameData) {
            this.socket.get(this.gameData.key);
        }
        else {
            // kick back to the create screen
            this.router.navigate(['/create']);
        }
    }

    private updatePlayers() {
        this.socket.update(this.gameData);
    }

}