import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
let ComponentsOverviewSnackBarComponent = class ComponentsOverviewSnackBarComponent {
    constructor(snackBar) {
        this.snackBar = snackBar;
        this.snackbarHTML = `<button mat-raised-button (click)="openSnackbar()">TRIGGER SNACKBAR</button>`;
    }
    ngOnInit() { }
    openSnackbar() {
        this.snackBar.open("I'm a notification!", 'CLOSE', {
            duration: 3000,
            horizontalPosition: 'right'
        });
    }
};
ComponentsOverviewSnackBarComponent = __decorate([
    Component({
        selector: 'vex-components-overview-snack-bar',
        templateUrl: './components-overview-snack-bar.component.html',
        styleUrls: ['./components-overview-snack-bar.component.scss'],
        standalone: true,
        imports: [MatButtonModule, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewSnackBarComponent);
export { ComponentsOverviewSnackBarComponent };
//# sourceMappingURL=components-overview-snack-bar.component.js.map