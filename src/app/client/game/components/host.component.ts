import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../shared/services/socketio.service';
import { PuzzleService } from '../../shared/services/puzzle.service';

@Component({
    template: `
        <h2>Host</h2>
        <p>{{gameKey}}</p>
        <button (click)="start()">Start Game</button>
        <puzzle [gameData]="gameData"></puzzle>
    `
})
export class HostPageComponent {
    public gameKey: string;
    public gameData: any;

    private routeSub: any;
    private serviceSub: any;

    constructor(
        private route: ActivatedRoute,
        private socket: SocketService,
        private service: PuzzleService) {

        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });

        this.socket
            .get(this.gameKey)
            .subscribe(data => {
                //console.log(data);
            }, console.log);
    }

    start() {
        this.serviceSub = this.service.getPuzzle().subscribe(data => {
            this.gameData = data;
            this.socket.update(this.gameKey, this.gameData);
        });
    }

    update() {
        
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.serviceSub.unsubscribe();
    }
}