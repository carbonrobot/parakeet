import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cg',
  template: '<h2>Create Game</h2><p>12345</p><button (click)="start()">Start</button>'
})
export class CreatePageComponent { 
    constructor(
      private router: Router
    ) {}

    start(){
      this.router.navigate(['/start', '12345']);
    }
}