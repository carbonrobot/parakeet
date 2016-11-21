import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: '<h2>Create Game</h2><p>{{newGameKey}}</p><button (click)="start()">Start</button>'
})
export class CreatePageComponent {
    private KEYCHARS: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    public newGameKey: string;

    constructor(private router: Router) {
        // TODO: we should confirm this is not already used by another host
        this.newGameKey = this.randomString(5, this.KEYCHARS);
     }

    public start() {
        this.router.navigate(['/host', this.newGameKey]);
    }

    private randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }
}