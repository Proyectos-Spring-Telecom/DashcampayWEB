import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { AsyncPipe, NgFor } from '@angular/common';
let NavigationComponent = class NavigationComponent {
    constructor(navigationService) {
        this.navigationService = navigationService;
        this.items$ = this.navigationService.items$;
    }
};
NavigationComponent = __decorate([
    Component({
        selector: 'vex-navigation',
        templateUrl: './navigation.component.html',
        styleUrls: ['./navigation.component.scss'],
        standalone: true,
        imports: [NgFor, NavigationItemComponent, AsyncPipe]
    })
], NavigationComponent);
export { NavigationComponent };
//# sourceMappingURL=navigation.component.js.map