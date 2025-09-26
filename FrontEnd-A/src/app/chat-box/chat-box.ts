
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Msg { id: number; text: string; me: boolean }

@Component({
  selector: 'app-chat-box',
  imports: [FormsModule],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss'
})
export class ChatBox {
  messages = signal<Msg[]>([
    { id: 1, text: 'Hey, how are you?', me: false },
    { id: 2,text: 'All good, thanks! You?', me: true }
  ]);

  draft = signal('');

  send() {
    const text = this.draft().trim();
    if (!text) return;
    this.messages.update(m => [...m, { id: 3, text, me: true }]);
    this.draft.set('');
  }
}