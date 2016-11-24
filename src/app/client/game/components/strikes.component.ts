import { Component, Input } from '@angular/core';

import { Game } from '../models/game.model';

@Component({
    selector: 'strike-zone',
    template: `
        <div class="strike-zone">
            <img src="/public/strike.png" class="strike" *ngIf="team.strikes >= 1" />
            <img src="/public/strike.png" class="strike" *ngIf="team.strikes >= 2" />
            <img src="/public/strike.png" class="strike" *ngIf="team.strikes >= 3" />
        </div>
    `
})
export class StrikesComponent {
    @Input() team: any;
}