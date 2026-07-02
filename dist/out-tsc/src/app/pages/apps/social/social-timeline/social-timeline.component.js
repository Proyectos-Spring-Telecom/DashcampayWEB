import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { friendSuggestions } from '../../../../../static-data/friend-suggestions';
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { scaleIn400ms } from "../../../../../@vex/animations/scale-in.animation";
import { stagger40ms } from "../../../../../@vex/animations/stagger.animation";
import { NgFor, NgIf } from '@angular/common';
import { SocialTimelineEntryComponent } from './components/social-timeline-entry/social-timeline-entry.component';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
let SocialTimelineComponent = class SocialTimelineComponent {
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
SocialTimelineComponent = __decorate([
    Component({
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
], SocialTimelineComponent);
export { SocialTimelineComponent };
//# sourceMappingURL=social-timeline.component.js.map