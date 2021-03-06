import { User } from './../../models/user.model';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { CacheService } from '../../services/cache.service';
import { DataService } from '../../core/data.service';
import { Chat } from '../../models/chat.model';
import { GroupChat } from '../../models/groupChat.model';

@Component({
  selector: 'app-messaging-system',
  templateUrl: './messaging-system.component.html',
  styleUrls: ['./messaging-system.component.css']
})
export class MessagingSystemComponent implements OnInit {

  constructor(
    private authServ: AuthService,
    private data: DataService,
    private cache: CacheService) { }

  currentUser: User;
  users: User[];

  groupChat = false;
  directMessage = false;
  globalChat = true;

  ngOnInit() {
    this.authServ.getCurrentUser().subscribe(user => {
      this.currentUser = user['0'];
      this.cache.user = this.currentUser;
    }
    );


    this.getUsers();
    this.getGroupChats();
  }

  getUsers() {
    this.data.getCollection('users')
      .subscribe(users => {
        this.cache.users = users as User[];
      })
  }

  getGroupChats() {
    this.data.getCollection('group-chat')
      .subscribe(groupChats => {
        this.cache.groupChats = groupChats as GroupChat[];
      })
  }
}
