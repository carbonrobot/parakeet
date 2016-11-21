import { Component } from '@angular/core';

@Component({
  selector: 'cg',
  template: `
  <h2>Start Game</h2>
  <p>12345</p>
  <button routerLink="/host">Host</button>
  <button routerLink="/player">Player</button>
  `
})
export class StartPageComponent { 
    
}