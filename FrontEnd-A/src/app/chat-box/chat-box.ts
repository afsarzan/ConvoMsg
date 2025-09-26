
import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  avatar?: string;
}

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

  messageControl = new FormControl('');
  isTyping = false;
  
  messages: Message[] = [
    {
      id: 1,
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      text: 'Hi there! I need help with my account.',
      sender: 'user',
      timestamp: new Date(Date.now() - 45000)
    },
    {
      id: 3,
      text: 'I\'d be happy to help you with your account. What specific issue are you experiencing?',
      sender: 'bot',
      timestamp: new Date(Date.now() - 30000)
    }
  ];

  private messageIdCounter = this.messages.length;

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
      sender: 'user',
      timestamp: new Date()
    };

    this.messages.push(userMessage);
    this.messageControl.setValue('');

    // Simulate bot typing
    this.simulateBotResponse();
  }

  private simulateBotResponse() {
    this.isTyping = true;

    // Simulate response delay
    setTimeout(() => {
      this.isTyping = false;
      
      const responses = [
        'Thank you for your message. Let me look into that for you.',
        'I understand your concern. Here\'s what I can do to help.',
        'That\'s a great question! Let me provide you with some information.',
        'I\'m here to assist you. Could you provide more details?',
        'I appreciate your patience. Let me check that for you right away.'
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botMessage: Message = {
        id: ++this.messageIdCounter,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      this.messages.push(botMessage);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  }

  trackByMessage(index: number, message: Message): number {
    return message.id;
  }

  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { 
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