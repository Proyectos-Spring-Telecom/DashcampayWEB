import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from './chat.component';
import { randFullName } from '@ngneat/falso';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chats: Chat[] = [
    {
      id: '2',
      imageUrl: '/assets/img/avatars/2.jpg',
      name: randFullName(),
      lastMessage: 'Hey, how are you?',
      unreadCount: 0,
      timestamp: '3 minutes ago'
    },
    {
      id: '3',
      imageUrl: '/assets/img/avatars/3.jpg',
      name: randFullName(),
      lastMessage: 'Thanks! Here are the files you requested.',
      unreadCount: 0,
      timestamp: '2 hours ago'
    },
    {
      id: '4',
      imageUrl: '/assets/img/avatars/4.jpg',
      name: randFullName(),
      lastMessage: 'Yes, I will send it right away.',
      unreadCount: 0,
      timestamp: '3 hours ago'
    },
    {
      id: '5',
      imageUrl: '/assets/img/avatars/5.jpg',
      name: randFullName(),
      lastMessage: 'Yes, I will send it right away.',
      unreadCount: 0,
      timestamp: '8 hours ago'
    },
    {
      id: '6',
      imageUrl: '/assets/img/avatars/6.jpg',
      name: randFullName(),
      lastMessage: 'Ok, will do!',
      unreadCount: 0,
      timestamp: '2 days ago'
    },
    {
      id: '7',
      imageUrl: '/assets/img/avatars/7.jpg',
      name: randFullName(),
      lastMessage: 'When are you going to be here?',
      unreadCount: 0,
      timestamp: '2 days ago'
    },
    {
      id: '8',
      imageUrl: '/assets/img/avatars/8.jpg',
      name: randFullName(),
      lastMessage: 'I am going to be there in 20 minutes.',
      unreadCount: 0,
      timestamp: '3 days ago'
    },
    {
      id: '9',
      imageUrl: '/assets/img/avatars/9.jpg',
      name: randFullName(),
      lastMessage: 'I love that idea!',
      unreadCount: 0,
      timestamp: '1 week ago'
    },
    {
      id: '10',
      imageUrl: '/assets/img/avatars/10.jpg',
      name: randFullName(),
      lastMessage: 'Hey, how are you?',
      unreadCount: 0,
      timestamp: '2 weeks ago'
    }
  ];
  drawerOpen = new BehaviorSubject<boolean>(false);
  drawerOpen$ = this.drawerOpen.asObservable();

  getChat(chatId: string): Chat | undefined {
    return this.chats.find((chat) => chat.id === chatId);
  }
}
