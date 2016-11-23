import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../services/socketio.service';

@Component({
    template: `
        <p *ngIf="!gameData">Waiting for Host to begin {{gameKey}}</p>
        <div *ngIf="gameData">
            <h1 class="cover-heading">{{gameData.team1}} VS {{gameData.team2}}</h1>
            <div class="container-fluid">
                <p class="lead">{{gameData.puzzle.question}}</p>
                <div class="row">
                    <div *ngFor="let item of gameData.puzzle.keys let idx=index" class="col-sm-6 puzzle-box">
                        <div class="puzzle-answer"><span *ngIf="item.team">{{item.d}}</span>&nbsp;</div>
                        <div class="puzzle-pct"><span *ngIf="item.team">{{item.p}}</span>&nbsp;</div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class PlayerPageComponent {
    public gameKey: string;
    public gameData: any;

    private routeSub: any;
    private socketSub: any;

    constructor(private route: ActivatedRoute, private socket: SocketService) {
        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });

        this.socketSub = this.socket
            .get(this.gameKey)
            .subscribe(data => {
                if (data.action === 'notification') this.onNotification(data.item);
                if (data.action === 'update') this.onUpdate(data.item);
            }, console.log);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.socketSub.unsubscribe();
    }

    private onNotification(item) {
        console.log('Notification received:', item.data);
    }

    private onUpdate(item) {
        this.gameData = item.data;
    }
}