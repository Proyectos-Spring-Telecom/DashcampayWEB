import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
let ComponentsOverviewMenuComponent = class ComponentsOverviewMenuComponent {
    constructor() {
        this.menuHTML = `<button mat-icon-button [mdMenuTriggerFor]="menu">
  <mat-icon>more_vert</mat-icon>
</button>

<mat-menu #menu="mdMenu">
  <button mat-menu-item>
    <mat-icon> dialpad </mat-icon>
    <span> Redial </span>
  </button>
  <button mat-menu-item disabled>
    <mat-icon> voicemail </mat-icon>
    <span> Check voicemail </span>
  </button>
  <button mat-menu-item>
    <mat-icon> notifications_off </mat-icon>
    <span> Disable alerts </span>
  </button>
</mat-menu>`;
    }
    ngOnInit() { }
};
ComponentsOverviewMenuComponent = __decorate([
    Component({
        selector: 'vex-components-overview-menu',
        templateUrl: './components-overview-menu.component.html',
        styleUrls: ['./components-overview-menu.component.scss'],
        standalone: true,
        imports: [
            MatButtonModule,
            MatMenuModule,
            MatIconModule,
            MatTabsModule,
            VexHighlightDirective
        ]
    })
], ComponentsOverviewMenuComponent);
export { ComponentsOverviewMenuComponent };
//# sourceMappingURL=components-overview-menu.component.js.map