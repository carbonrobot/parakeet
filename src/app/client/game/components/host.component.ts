import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../shared/services/socketio.service';
import { PuzzleService } from '../../shared/services/puzzle.service';

@Component({
    template: `
        <h2>Host</h2>
        <p>{{gameKey}}</p>
        <div>
            <label for="team1Name">Team 1</label>
            <input type="text" name="team1Name" [(ngModel)]="team1Name"/>
        </div>
        <div>
            <label for="team2Name">Team 2</label>
            <input type="text" name="team2Name" [(ngModel)]="team2Name"/>
        </div>
        <button (click)="start()">Start New Puzzle</button>
        <div *ngIf="gameData">
            <p>{{gameData.question}}</p>
            <div>
                <div *ngFor="let item of gameData.keys let idx=index">
                    <div>{{item.d}}</div>
                    <div>{{item.p}}</div>
                    <div>
                        <button (click)="select(idx, 1)" [disabled]="item.team">{{gameData.team1Name}}</button>
                        <button (click)="select(idx, 2)" [disabled]="item.team">{{gameData.team2Name}}</button>
                        <button (click)="select(idx, 0)" [disabled]="item.team">X</button>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class HostPageComponent {
    public gameKey: string;
    public gameData: any;
    public team1Name: string = 'Pigs';
    public team2Name: string = 'Cows';

    private routeSub: any;
    private serviceSub: any;

    constructor(
        private route: ActivatedRoute,
        private socket: SocketService,
        private service: PuzzleService) {

        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });

        // TODO: create 'rooms' so only clients with the same key get updates
        this.socket
            .get(this.gameKey)
            .subscribe(data => {
                //console.log(data);
            }, console.log);
    }

    start() {
        this.serviceSub = this.service.getPuzzle().subscribe(data => {
            this.gameData = data;

            // add team names
            // TODO: we should be able to keep a running score across multiple puzzles
            this.gameData.gameKey = this.gameKey;
            this.gameData.team1Name = this.team1Name;
            this.gameData.team2Name = this.team2Name;

            this.updatePlayers();
        });
    }

    select(idx: number, team: number){
        this.gameData[idx].team = team;
        this.updatePlayers();
    }

    private updatePlayers(){
        this.socket.update(this.gameKey, this.gameData);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.serviceSub.unsubscribe();
    }
    
}