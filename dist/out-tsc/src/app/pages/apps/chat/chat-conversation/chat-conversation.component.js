import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { chatMessages } from '../../../../../static-data/chat-messages';
import { trackById } from "../../../../../@vex/utils/track-by";
import { map } from 'rxjs/operators';
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { stagger20ms } from "../../../../../@vex/animations/stagger.animation";
import { VexScrollbarComponent } from "../../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let ChatConversationComponent = class ChatConversationComponent {
    constructor(route, chatService, cd) {
        this.route = route;
        this.chatService = chatService;
        this.cd = cd;
        this.form = new FormGroup({
            message: new FormControl('', {
                nonNullable: true
            })
        });
        this.trackById = trackById;
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        this.route.paramMap
            .pipe(map((paramMap) => paramMap.get('chatId')), takeUntilDestroyed(this.destroyRef))
            .subscribe((chatId) => {
            this.messages = [];
            if (!chatId) {
                throw new Error('Chat id not found!');
            }
            this.cd.detectChanges();
            const chat = this.chatService.getChat(chatId);
            if (!chat) {
                throw new Error(`Chat with id ${chatId} not found!`);
            }
            this.chat = chat;
            this.chat.unreadCount = 0;
            this.filterMessages(chatId);
            this.cd.detectChanges();
            this.scrollToBottom();
        });
    }
    filterMessages(id) {
        this.messages = chatMessages.filter((message) => message.id === id);
    }
    send() {
        this.messages.push({
            id: this.chat.id,
            from: 'me',
            message: this.form.controls.message.getRawValue()
        });
        this.form.controls.message.setValue('');
        this.cd.detectChanges();
        this.scrollToBottom();
    }
    scrollToBottom() {
        if (!this.scrollbar) {
            return;
        }
        this.scrollbar.scrollbarRef?.getScrollElement()?.scrollTo({
            behavior: 'smooth',
            top: this.scrollbar.scrollbarRef.getContentElement()?.clientHeight
        });
    }
    openDrawer() {
        this.chatService.drawerOpen.next(true);
        this.cd.markForCheck();
    }
    closeDrawer() {
        this.chatService.drawerOpen.next(false);
        this.cd.markForCheck();
    }
};
__decorate([
    ViewChild(VexScrollbarComponent)
], ChatConversationComponent.prototype, "scrollbar", void 0);
ChatConversationComponent = __decorate([
    Component({
        selector: 'vex-chat-conversation',
        templateUrl: './chat-conversation.component.html',
        styleUrls: ['./chat-conversation.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [fadeInUp400ms, stagger20ms],
        standalone: true,
        imports: [
            MatButtonModule,
            MatIconModule,
            NgIf,
            MatMenuModule,
            VexScrollbarComponent,
            NgFor,
            ReactiveFormsModule,
            MatDividerModule
        ]
    })
], ChatConversationComponent);
export { ChatConversationComponent };
//# sourceMappingURL=chat-conversation.component.js.map