import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { trackByRoute } from "../../../../@vex/utils/track-by";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
let HelpCenterComponent = class HelpCenterComponent {
    constructor() {
        this.links = [
            {
                label: 'Getting Started',
                route: 'getting-started',
                icon: 'mat:flag'
            },
            {
                label: 'Pricing & Plans',
                route: 'pricing',
                icon: 'mat:attach_money'
            },
            {
                label: 'FAQ',
                route: 'faq',
                icon: 'mat:contact_support'
            },
            {
                label: 'Guides',
                route: 'guides',
                icon: 'mat:book'
            }
        ];
        this.trackByRoute = trackByRoute;
    }
    ngOnInit() { }
};
HelpCenterComponent = __decorate([
    Component({
        selector: 'vex-help-center',
        templateUrl: './help-center.component.html',
        styleUrls: ['./help-center.component.scss'],
        animations: [stagger40ms, fadeInUp400ms],
        standalone: true,
        imports: [
            MatIconModule,
            MatButtonModule,
            NgFor,
            MatRippleModule,
            RouterLinkActive,
            NgClass,
            RouterLink,
            RouterOutlet
        ]
    })
], HelpCenterComponent);
export { HelpCenterComponent };
//# sourceMappingURL=help-center.component.js.map