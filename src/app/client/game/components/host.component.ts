import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SocketService } from '../services/socketio.service';
import { GameService } from '../services/game.service';

import { Game } from '../models/game.model';

@Component({
    template: `
        <div *ngIf="gameData">
            <h1 class="cover-heading">{{gameData.team1}} VS {{gameData.team2}}</h1>
            <p class="lead">Provide this key <strong>{{gameData.key}}</strong> to another browser window to display the gameboard.</p>
            <p><a class="btn btn-default" (click)="newPuzzle()">New Puzzle</a></p>
            <div *ngIf="gameData.puzzle" class="container-fluid">
                <p>{{gameData.puzzle.question}}<p>
                <div class="table-responsive">
                    <table class="table table-bordered table-condensed">
                        <thead>
                            <tr>
                                <th>Team</th>
                                <th>Score</th>
                                <th>Strikes</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{gameData.team1}}</td>
                                <td>{{gameData.puzzle.team1.score}}</td>
                                <td>{{gameData.puzzle.team1.strikes}}</td>
                                <td><button type="button" class="btn btn-sm btn-default" (click)="strike(1)">XXX</button></td>
                            </tr>
                            <tr>
                                <td>{{gameData.team2}}</td>
                                <td>{{gameData.puzzle.team2.score}}</td>
                                <td>{{gameData.puzzle.team2.strikes}}</td>
                                <td><button type="button" class="btn btn-sm btn-default" (click)="strike(2)">XXX</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div *ngFor="let item of gameData.puzzle.keys let idx=index" class="col-sm-12 puzzle-box">
                        <div class="puzzle-answer">{{item.d}}</div>
                        <div class="puzzle-actions">
                            <button type="button" class="btn btn-sm btn-default" (click)="select(idx, 1)" [disabled]="item.team === 1">{{gameData.team1}}</button>
                            <button type="button" class="btn btn-sm btn-default" (click)="select(idx, 2)" [disabled]="item.team === 2">{{gameData.team2}}</button>
                            <button type="button" class="btn btn-sm btn-default" (click)="select(idx, 0)" [disabled]="item.team === 0">X</button>
                        </div>
                        <div class="puzzle-pct">{{item.p}}</div>
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
            this.updatePlayers.call(this);
        });
    }

    select(idx: number, team: number) {
        this.gameData.puzzle.keys[idx].team = team;
        this.updateScores.call(this);
        this.updatePlayers.call(this);
    }

    strike(team: number) {
        if (this.gameData.puzzle['team' + team].strikes < 3) {
            this.gameData.puzzle['team' + team].strikes += 1;
        }
        this.updatePlayers.call(this);
        this.socket.strike(this.gameData.puzzle['team' + team].strikes);
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

    private updateScores(){
        let t1 = 0;
        let t2 = 0;
        for(let i = 0; i < this.gameData.puzzle.keys.length; i++){
            if(this.gameData.puzzle.keys[i].team === 1){
                t1 += this.gameData.puzzle.keys[i].p;
            }
            if(this.gameData.puzzle.keys[i].team === 2){
                t2 += this.gameData.puzzle.keys[i].p;
            }
        }
        this.gameData.puzzle.team1.score = t1;
        this.gameData.puzzle.team2.score = t2;
    }

}