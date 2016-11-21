import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultPageComponent } from './default/default.component';
import { CreatePageComponent } from './game/create.component';
import { JoinPageComponent } from './game/join.component';
import { StartPageComponent } from './game/start.component';

const routeConfig : Routes = [
  { path: '', component: DefaultPageComponent },
  { path: 'create', component: CreatePageComponent },
  { path: 'join', component: JoinPageComponent },
  { path: 'start/:id', component: StartPageComponent }
];

@NgModule({
  imports:      [ 
    BrowserModule, 
    RouterModule.forRoot(routeConfig) 
  ],
  declarations: [ 
    AppComponent, 
    DefaultPageComponent,
    CreatePageComponent,
    JoinPageComponent,
    StartPageComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }