import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  private readonly SOCKET_URL = environment.apiConfig.socketServer; 
  // en dev: http://localhost:3220

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(this.SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    this.socket.on('connect', () => {
      console.log('[Socket] connected:', this.socket.id);

      // Unirse al room de POS
      this.socket.emit('join', {
        app: 'pos',
      });
    });

    this.socket.on('disconnect', () => {
      console.log('[Socket] disconnected');
    });
  }

  listen<T>(event: string): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.socket.on(event, (data: T) => {
        subscriber.next(data);
      });

      return () => {
        this.socket.off(event);
      };
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }
}
