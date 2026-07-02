import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
let ContactsCardComponent = class ContactsCardComponent {
    constructor() {
        this.openContact = new EventEmitter();
        this.toggleStar = new EventEmitter();
    }
    ngOnInit() { }
    emitToggleStar(event, contactId) {
        event.stopPropagation();
        this.toggleStar.emit(contactId);
    }
};
__decorate([
    Input({ required: true })
], ContactsCardComponent.prototype, "contact", void 0);
__decorate([
    Output()
], ContactsCardComponent.prototype, "openContact", void 0);
__decorate([
    Output()
], ContactsCardComponent.prototype, "toggleStar", void 0);
ContactsCardComponent = __decorate([
    Component({
        selector: 'vex-contacts-card',
        templateUrl: './contacts-card.component.html',
        styleUrls: ['./contacts-card.component.scss'],
        standalone: true,
        imports: [MatRippleModule, MatIconModule, MatButtonModule, NgIf]
    })
], ContactsCardComponent);
export { ContactsCardComponent };
//# sourceMappingURL=contacts-card.component.js.map