import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { scaleIn400ms } from "../../../../@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
let SocialComponent = class SocialComponent {
    constructor() {
        this.links = [
            {
                label: 'ABOUT',
                route: './',
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: 'TIMELINE',
                route: './timeline'
            },
            {
                label: 'FRIENDS',
                route: '',
                disabled: true
            },
            {
                label: 'PHOTOS',
                route: '',
                disabled: true
            }
        ];
    }
    ngOnInit() { }
};
SocialComponent = __decorate([
    Component({
        selector: 'vex-social',
        templateUrl: './social.component.html',
        styleUrls: ['./social.component.scss'],
        animations: [scaleIn400ms, fadeInRight400ms],
        standalone: true,
        imports: [MatTabsModule, NgFor, RouterLinkActive, RouterLink, RouterOutlet]
    })
], SocialComponent);
export { SocialComponent };
//# sourceMappingURL=social.component.js.map