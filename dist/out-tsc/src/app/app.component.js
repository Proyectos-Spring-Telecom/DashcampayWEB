import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertModalComponent } from './pages/pages/modal/alert-modal.component';
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        selector: 'vex-root',
        templateUrl: './app.component.html',
        standalone: true,
        imports: [RouterOutlet, AlertModalComponent],
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map