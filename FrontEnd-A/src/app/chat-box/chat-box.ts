
import { Component, ElementRef, inject, input, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
import { Message } from './message.model';



@Component({
  selector: 'app-chat-box',
  imports: [FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.scss'
})
export class ChatBox {
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  socketService = inject(SocketService); 
  messageControl = new FormControl('');
  isTyping = false;
  userName = input('username');
  messages = signal<Message[]>([]);
  private messageIdCounter = this.messages.length;

 ngOnInit() {
    this.socketService.onUserJoined( (message: string) => {
      console.log(message);
    });

    this.socketService.onMessage((msg: Message) => {
          this.messages.update(currentMessages => [...currentMessages, msg]);

    });
  }

 

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendMessage() {
    const messageText = this.messageControl.value?.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: ++this.messageIdCounter,
      text: messageText,
      sender: this.userName(),
      timestamp: new Date(),
    };

    this.messages.update(current => [...current, userMessage]);
    this.socketService.sendMessage(userMessage);

    
    this.messageControl.setValue('');

  }

 
  trackByMessage(index: number, message: Message): number {
    return message.id;
  }

  formatTime(timestamp: Date): string {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
      }
    } catch(err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}