import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { MatIconModule } from '@angular/material/icon';
let InvoiceComponent = class InvoiceComponent {
    constructor() { }
    ngOnInit() { }
};
InvoiceComponent = __decorate([
    Component({
        selector: 'vex-invoice',
        templateUrl: './invoice.component.html',
        styleUrls: ['./invoice.component.scss'],
        animations: [fadeInUp400ms],
        standalone: true,
        imports: [MatIconModule]
    })
], InvoiceComponent);
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map