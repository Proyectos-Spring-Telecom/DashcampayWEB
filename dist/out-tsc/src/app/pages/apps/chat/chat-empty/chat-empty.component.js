import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { scaleFadeIn400ms } from "../../../../../@vex/animations/scale-fade-in.animation";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let ChatEmptyComponent = class ChatEmptyComponent {
    constructor(chatService, cd) {
        this.chatService = chatService;
        this.cd = cd;
    }
    ngOnInit() { }
    openDrawer() {
        this.chatService.drawerOpen.next(true);
        this.cd.markForCheck();
    }
    closeDrawer() {
        this.chatService.drawerOpen.next(false);
        this.cd.markForCheck();
    }
};
ChatEmptyComponent = __decorate([
    Component({
        selector: 'vex-chat-empty',
        templateUrl: './chat-empty.component.html',
        animations: [scaleFadeIn400ms],
        standalone: true,
        imports: [MatButtonModule, MatIconModule]
    })
], ChatEmptyComponent);
export { ChatEmptyComponent };
//# sourceMappingURL=chat-empty.component.js.map