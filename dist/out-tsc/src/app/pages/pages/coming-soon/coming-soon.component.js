import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
let ComingSoonComponent = class ComingSoonComponent {
    constructor() { }
    ngOnInit() { }
};
ComingSoonComponent = __decorate([
    Component({
        selector: 'vex-coming-soon',
        templateUrl: './coming-soon.component.html',
        styleUrls: ['./coming-soon.component.scss'],
        animations: [fadeInUp400ms],
        standalone: true,
        imports: [MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule]
    })
], ComingSoonComponent);
export { ComingSoonComponent };
//# sourceMappingURL=coming-soon.component.js.map