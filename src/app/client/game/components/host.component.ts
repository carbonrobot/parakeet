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
            <div>
                <a class="btn btn-default" (click)="newPuzzle()">New Puzzle</a>
            </div>
            <div *ngIf="gameData.puzzle" class="container-fluid">
                <p>{{gameData.puzzle.question}}</p>
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
        this.updatePlayers.call(this);
    }

    ngOnInit() {
        if(this.gameData){
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