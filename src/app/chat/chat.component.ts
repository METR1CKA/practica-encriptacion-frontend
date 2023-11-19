import { Component, ElementRef, ViewChild } from '@angular/core';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @ViewChild('messageContainer')
  private messageContainer!: ElementRef;

  messages: any[] = []
  newMessage = ''
  socket

  constructor() {
    this.socket = io(environment.socket)
    this.socket.on('get:messages', message => this.messages.push(message))
  }

  sendMessage() {
    this.socket.emit('send:message', this.newMessage)
    this.newMessage = ''
  }

  isOdd(index: number): boolean {
    return index % 2 !== 0;
  }

  private scrollToBottom(): void {
    this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
