import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";

import { PuzzleService } from '../../shared/services/puzzle.service';
import { Game } from '../models/game.model';

@Injectable()
export class GameService {

    constructor(private service: PuzzleService){}

    public data: Game;

    public startNewGame(team1: string = 'Team 1', team2: string = 'Team 2') {
        const gameData: Game = new Game();

        // TODO: we should confirm this is not already used by another host
        gameData.key = this.generateKey();
        gameData.team1 = { name: team1, strikes: 0, score: 0 };
        gameData.team2 = { name: team2, strikes: 0, score: 0 };

        this.data = gameData;
    }

    public getNewPuzzle() {
        return this.service.getPuzzle().toPromise().then(data => {
            this.data.puzzle = data;
        });
    }

    private generateKey() {
        const length = 5;
        const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

}