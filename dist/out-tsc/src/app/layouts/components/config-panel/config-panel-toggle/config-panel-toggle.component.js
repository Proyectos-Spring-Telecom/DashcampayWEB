import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let ConfigPanelToggleComponent = class ConfigPanelToggleComponent {
    constructor() {
        this.openConfig = new EventEmitter();
    }
    ngOnInit() { }
};
__decorate([
    Output()
], ConfigPanelToggleComponent.prototype, "openConfig", void 0);
ConfigPanelToggleComponent = __decorate([
    Component({
        selector: 'vex-config-panel-toggle',
        templateUrl: './config-panel-toggle.component.html',
        styleUrls: ['./config-panel-toggle.component.scss'],
        standalone: true,
        imports: [MatButtonModule, MatIconModule]
    })
], ConfigPanelToggleComponent);
export { ConfigPanelToggleComponent };
//# sourceMappingURL=config-panel-toggle.component.js.map