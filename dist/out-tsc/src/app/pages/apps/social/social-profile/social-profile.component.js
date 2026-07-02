import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { friendSuggestions } from '../../../../../static-data/friend-suggestions';
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "../../../../../@vex/animations/scale-in.animation";
import { stagger40ms } from "../../../../../@vex/animations/stagger.animation";
import { MatButtonModule } from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
let SocialProfileComponent = class SocialProfileComponent {
    constructor() {
        this.suggestions = friendSuggestions;
    }
    ngOnInit() { }
    addFriend(friend) {
        friend.added = true;
    }
    removeFriend(friend) {
        friend.added = false;
    }
    trackByName(index, friend) {
        return friend.name;
    }
};
SocialProfileComponent = __decorate([
    Component({
        selector: 'vex-social-profile',
        templateUrl: './social-profile.component.html',
        styleUrls: ['./social-profile.component.scss'],
        animations: [fadeInUp400ms, fadeInRight400ms, scaleIn400ms, stagger40ms],
        standalone: true,
        imports: [MatIconModule, NgFor, NgIf, MatButtonModule]
    })
], SocialProfileComponent);
export { SocialProfileComponent };
//# sourceMappingURL=social-profile.component.js.map