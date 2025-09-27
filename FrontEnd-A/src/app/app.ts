import { Component, computed, inject, signal } from '@angular/core';
import { LandingBox } from './landing-box/landing-box';
import { ChatBox } from './chat-box/chat-box';
import { CommonModule } from '@angular/common';
import { SocketService } from './services/socket.service';

@Component({
  selector: 'app-root',
  imports: [LandingBox,ChatBox, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  userName = signal<string>('');
  userNameLength = computed( () => this.userName().length)
  socketService = inject(SocketService);

  setUserName(userName: string) {
    this.userName.set(userName);
    this.socketService.userJoined(userName);
  }
}
