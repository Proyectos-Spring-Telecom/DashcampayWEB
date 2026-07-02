import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let FooterComponent = class FooterComponent {
    constructor() {
        this.year = new Date().getFullYear();
    }
    ngOnInit() { }
    ngOnDestroy() { }
};
FooterComponent = __decorate([
    Component({
        selector: 'vex-footer',
        templateUrl: './footer.component.html',
        styleUrls: ['./footer.component.scss'],
        standalone: true,
        imports: [MatButtonModule, MatIconModule]
    })
], FooterComponent);
export { FooterComponent };
//# sourceMappingURL=footer.component.js.map