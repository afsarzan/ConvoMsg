import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingBox } from './landing-box/landing-box';
import { ChatBox } from './chat-box/chat-box';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LandingBox,ChatBox],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  userName = signal<string | null>(null);

  setUserName(name: string) {
    this.userName.set(name);
  }
}
