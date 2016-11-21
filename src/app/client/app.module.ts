import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultPageComponent } from './default/default.component';
import { GameModule } from './game/game.module';

const routeConfig: Routes = [
    { path: '', component: DefaultPageComponent }
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routeConfig),
        GameModule
    ],
    declarations: [
        AppComponent,
        DefaultPageComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }