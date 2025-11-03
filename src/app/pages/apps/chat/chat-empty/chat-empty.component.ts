import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { scaleFadeIn400ms } from '@vex/animations/scale-fade-in.animation';
import { ChatService } from '../chat.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-chat-empty',
  templateUrl: './chat-empty.component.html',
  animations: [scaleFadeIn400ms],
  standalone: true,
  imports: [MatButtonModule, MatIconModule]
})
export class ChatEmptyComponent implements OnInit {
  constructor(
    private chatService: ChatService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  openDrawer() {
    this.chatService.drawerOpen.next(true);
    this.cd.markForCheck();
  }

  closeDrawer() {
    this.chatService.drawerOpen.next(false);
    this.cd.markForCheck();
  }
}
