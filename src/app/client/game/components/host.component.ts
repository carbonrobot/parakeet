import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../../shared/services/socketio.service';

@Component({
    template: `<h2>Host</h2><p>{{gameKey}}</p><button (click)="test()">Test</button>`
})
export class HostPageComponent {
    public gameKey: string;

    private routeSub: any;

    constructor(private route: ActivatedRoute, private socket: SocketService) {
        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });

        
        this.socket
            .get(this.gameKey)
            .subscribe(data => {
                //console.log(data);
            }, console.log);
    }

    test(){
        console.log('sending notification from host');
        this.socket.notify('Host key: ' + this.gameKey);
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}