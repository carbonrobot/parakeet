import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';

import { DefaultPageComponent } from './default/default.component';

const routeConfig: Routes = [
    { path: '', component: DefaultPageComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routeConfig),
        HttpModule,
        GameModule
    ],
    declarations: [
        AppComponent,
        DefaultPageComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }