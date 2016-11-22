import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";

@Injectable()
export class PuzzleService {

    constructor(private http: Http) { }

    public getPuzzle(): Observable<any> {
        return this.http.get('/api/puzzle')
            .map((response: Response) => response.json());
    }

}