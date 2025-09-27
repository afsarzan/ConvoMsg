// socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Message } from '../chat-box/message.model';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4600'); // Connect to Socket.IO server
  }

  userJoined(userName: string): void {
    this.socket.emit('joinRoom', userName);
  }

  // Method to send message to the server
  sendMessage(message: Message): void {
    this.socket.emit('chatMessage', message);
  }

  // Observable to receive Message from the server
  onMessage(callback: (message: Message) => void): void {
    this.socket.on('chatMessage', callback);
  }

    // Observable if user connect to  the server
  onUserJoined(callback: (message: string) => void): void {
    this.socket.on('roomNotice', callback);
  }
}