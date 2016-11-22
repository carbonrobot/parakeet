import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../shared/services/socketio.service';

@Component({
    template: `
        <h2>Player</h2>
        <p>{{gameKey}}</p>
        <puzzle [gameData]="gameData"></puzzle>
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