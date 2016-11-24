import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socketio.service';

@Component({
    template: `
        <p *ngIf="!gameData">Waiting for Host to begin {{gameKey}}</p>
        <div *ngIf="gameData">
            <h1 class="cover-heading">{{gameData.team1.name}} VS {{gameData.team2.name}}</h1>
            <div class="container-fluid score-board">
                <div class="row hidden-xs">
                    <div class="col-sm-3 text-right"><strike-zone [team]="gameData.team1"></strike-zone></div>
                    <div class="col-sm-2 team-score right">{{gameData.team1.score}}</div>
                    <div class="col-sm-2">&nbsp;</div>
                    <div class="col-sm-2 team-score">{{gameData.team2.score}}</div>
                    <div class="col-sm-3 text-left"><strike-zone [team]="gameData.team2"></strike-zone></div>
                </div>
                <div class="row visible-sm">
                    <div class="col-xs-5 team-score right">{{gameData.team1.score}}</div>
                    <div class="col-xs-2">&nbsp;</div>
                    <div class="col-xs-5 team-score">{{gameData.team2.score}}</div>
                    <div class="col-xs-5 text-right"><strike-zone [team]="gameData.team1"></strike-zone></div>
                    <div class="col-xs-2">&nbsp;</div>
                    <div class="col-xs-5 text-left"><strike-zone [team]="gameData.team2"></strike-zone></div>
                </div>
            </div>
            
            <div class="container-fluid">
                <p class="lead">{{gameData.puzzle.question}}</p>
                <div class="row">
                    <div *ngFor="let item of gameData.puzzle.keys let idx=index" class="col-sm-6">
                        <div class="row puzzle-box">
                            <div class="col-xs-10 puzzle-answer"><span *ngIf="item.team">{{item.d}}</span>&nbsp;</div>
                            <div class="col-xs-2 puzzle-pct"><span *ngIf="item.team">{{item.p}}</span>&nbsp;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="player-strike" *ngIf="strike" [class.double]="strike == 2" [class.triple]="strike == 3"></div>
    `
})
export class PlayerPageComponent {
    public gameKey: string;
    public gameData: any;
    public strike: number;

    private routeSub: any;
    private socketSub: any;

    private sound_buzz = new Audio();
    private sound_correct = new Audio();

    constructor(private route: ActivatedRoute, private socket: SocketService) {
        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });

        this.socketSub = this.socket
            .get(this.gameKey)
            .subscribe(data => {
                if (data.action === 'notification') this.onNotification(data.item);
                if (data.action === 'update') this.onUpdate(data.item);
                if (data.action === 'answer') this.onAnswer(data.item);
                if (data.action === 'strike') this.onStrike(data.item);
            }, console.log);

        this.sound_buzz.src = '/public/buzz.mp3';
        this.sound_buzz.load();

        this.sound_correct.src = '/public/correct.mp3';
        this.sound_correct.load();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.socketSub.unsubscribe();
    }

    private onNotification(item) {
        console.log('Notification received:', item);
    }

    private onUpdate(item) {
        this.gameData = item;
    }

    private onAnswer(item) {
        this.gameData = item;
        this.sound_correct.play();
    }

    private onStrike(item){
        this.strike = item;
        setTimeout(() => {
            this.strike = null;
        }, 5000);

        this.sound_buzz.play();
    }
    
}