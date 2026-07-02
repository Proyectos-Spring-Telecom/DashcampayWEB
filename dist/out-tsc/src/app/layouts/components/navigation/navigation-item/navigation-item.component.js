import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { filter, map, startWith } from 'rxjs/operators';
import { NavigationEnd, RouterLink } from '@angular/router';
import { trackByRoute } from "../../../../../@vex/utils/track-by";
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { AsyncPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
let NavigationItemComponent = class NavigationItemComponent {
    constructor(navigationService, router) {
        this.navigationService = navigationService;
        this.router = router;
        this.isActive$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), map(() => (item) => this.hasActiveChilds(item)));
        this.isLink = this.navigationService.isLink;
        this.isDropdown = this.navigationService.isDropdown;
        this.isSubheading = this.navigationService.isSubheading;
        this.trackByRoute = trackByRoute;
    }
    ngOnInit() { }
    hasActiveChilds(parent) {
        if (this.isLink(parent)) {
            return this.router.isActive(parent.route, true);
        }
        if (this.isDropdown(parent) || this.isSubheading(parent)) {
            return parent.children.some((child) => {
                if (this.isDropdown(child)) {
                    return this.hasActiveChilds(child);
                }
                if (this.isLink(child) && !this.isFunction(child.route)) {
                    return this.router.isActive(child.route, true);
                }
                return false;
            });
        }
        return false;
    }
    isFunction(prop) {
        return prop instanceof Function;
    }
};
__decorate([
    Input({ required: true })
], NavigationItemComponent.prototype, "item", void 0);
NavigationItemComponent = __decorate([
    Component({
        selector: 'vex-navigation-item',
        templateUrl: './navigation-item.component.html',
        styleUrls: ['./navigation-item.component.scss'],
        standalone: true,
        imports: [
            NgIf,
            MatRippleModule,
            NgClass,
            RouterLink,
            MatMenuModule,
            NgFor,
            MatIconModule,
            NgTemplateOutlet,
            AsyncPipe
        ]
    })
], NavigationItemComponent);
export { NavigationItemComponent };
//# sourceMappingURL=navigation-item.component.js.map