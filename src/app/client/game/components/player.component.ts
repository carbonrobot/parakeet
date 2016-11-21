import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `<h2>Player</h2><p>{{gameKey}}</p>`
})
export class PlayerPageComponent {
    public gameKey: string;

    private routeSub: any;

    constructor(private route: ActivatedRoute){
        this.routeSub = route.params.subscribe(params => {
            this.gameKey = params['key'];
        });
    }

    ngOnDestroy(){
        this.routeSub.unsubscribe();
    }
}