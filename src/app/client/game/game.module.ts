import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CreatePageComponent } from './components/create.component';
import { JoinPageComponent } from './components/join.component';
import { HostPageComponent } from './components/host.component';
import { PlayerPageComponent } from './components/player.component';
import { StrikesComponent } from './components/strikes.component';

import { SocketService } from './services/socketio.service';
import { GameService } from './services/game.service';
import { PuzzleService } from '../shared/services/puzzle.service';

const routeConfig: Routes = [
    { path: 'create', component: CreatePageComponent },
    { path: 'join', component: JoinPageComponent },
    { path: 'host/:key', component: HostPageComponent },
    { path: 'player/:key', component: PlayerPageComponent }
];

@NgModule({
    imports: [
        FormsModule,
        RouterModule.forChild(routeConfig),
        BrowserModule
    ],
    declarations: [
        CreatePageComponent,
        JoinPageComponent,
        HostPageComponent,
        PlayerPageComponent,
        StrikesComponent
    ],
    providers: [
        SocketService,
        PuzzleService,
        GameService
    ]
})
export class GameModule { }