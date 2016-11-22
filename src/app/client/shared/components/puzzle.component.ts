import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'puzzle',
    template: `
        <div *ngIf="gameData">
            <p>{{gameData.question}}</p>
            <div>
                <div *ngFor="let item of gameData.keys">
                    <div>{{item.d}}</div>
                    <div>{{item.p}}</div>
                    <button>A</button>
                    <button>B</button>
                </div>
            </div>
        </div>
    `
})
export class PuzzleComponent {
    @Input() public gameData: any;

    constructor(private router: Router){}
}