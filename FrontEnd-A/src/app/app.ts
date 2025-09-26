import { Component, computed, signal } from '@angular/core';
import { LandingBox } from './landing-box/landing-box';
import { ChatBox } from './chat-box/chat-box';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [LandingBox,ChatBox, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  userName = signal<string>('');
  userNameLength = computed( () => this.userName().length)

  setUserName(userName: string) {
    this.userName.set(userName);
  }
}
