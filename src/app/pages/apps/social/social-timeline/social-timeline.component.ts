import { Component, OnInit } from '@angular/core';
import { friendSuggestions } from '../../../../../static-data/friend-suggestions';
import { FriendSuggestion } from '../social.component';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { NgFor, NgIf } from '@angular/common';
import { SocialTimelineEntryComponent } from './components/social-timeline-entry/social-timeline-entry.component';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'vex-social-timeline',
  templateUrl: './social-timeline.component.html',
  styleUrls: ['./social-timeline.component.scss'],
  animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
  standalone: true,
  imports: [
    MatRippleModule,
    MatIconModule,
    TextFieldModule,
    MatButtonModule,
    SocialTimelineEntryComponent,
    NgFor,
    NgIf
  ]
})
export class SocialTimelineComponent implements OnInit {
  suggestions = friendSuggestions;

  constructor() {}

  ngOnInit(): void {}

  addFriend(friend: FriendSuggestion) {
    friend.added = true;
  }

  removeFriend(friend: FriendSuggestion) {
    friend.added = false;
  }

  trackByName(index: number, friend: FriendSuggestion) {
    return friend.name;
  }
}
