import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
    private name: string;
    private socket: SocketIOClient.Socket;

    constructor() { }

    get(name: string): Observable<any> {
        this.name = name;
        this.socket = io();
        
        // join a room
        this.socket.emit('join', this.name);

        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (err: string) => this.onError);

        let o = new Observable((observer: any) => {
            this.socket.on("notification", item => observer.next({ action: "notification", item: item }));
            this.socket.on("update", item => observer.next({ action: "update", item: item }));
            return () => this.socket.close();
        });
        return o;
    }

    notify(message: string) {
        this.socket.emit('notify', { room: this.name, data: message });
    }

    update(data: any) {
        this.socket.emit('update', { room: this.name, data: data });
    }

    private connect() {
        console.log(`[socket] connected to "${this.name}"`);
    }

    private disconnect() {
        console.log(`[socket] disconnected from "${this.name}"`);
    }

    private onError(error: string){
        console.log(`[socket, error]: "${error}"`);
    }
}