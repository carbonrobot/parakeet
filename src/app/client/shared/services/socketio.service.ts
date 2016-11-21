import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private name: string;
    private socket: SocketIOClient.Socket;

    constructor() { }

    notify(message: string) {
        this.socket.emit('notify', { msg: message });
    }

    get(name: string): Observable<any> {
        this.name = name;
        this.socket = io();
        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`[socket, error]: "${error}"`);
        });

        let o = new Observable((observer: any) => {
            this.socket.on("notification", console.log);
            this.socket.on("notification", item => observer.next({ action: "notification", item: item }));
            this.socket.on("update", item => observer.next({ action: "update", item: item }));
            return () => this.socket.close();
        });
        return o;

        // return Observable.create((observer: any) => {
        //     this.socket.on("notification", item => observer.next({ action: "notification", item: item }));
        //     this.socket.on("update", item => observer.next({ action: "update", item: item }));
        //     return () => this.socket.close();
        // });
    }

    private connect() {
        console.log(`Connected to "${this.name}"`);
    }

    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}