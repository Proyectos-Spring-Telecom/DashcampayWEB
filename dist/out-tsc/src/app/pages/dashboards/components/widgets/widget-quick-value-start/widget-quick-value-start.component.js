import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { scaleInOutAnimation } from "../../../../../../@vex/animations/scale-in-out.animation";
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
let WidgetQuickValueStartComponent = class WidgetQuickValueStartComponent {
    constructor(_bottomSheet) {
        this._bottomSheet = _bottomSheet;
        this.showButton = false;
    }
    ngOnInit() { }
    openSheet() {
        this._bottomSheet.open(ShareBottomSheetComponent);
    }
};
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "icon", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "value", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "label", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "change", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "changeSuffix", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueStartComponent.prototype, "helpText", void 0);
WidgetQuickValueStartComponent = __decorate([
    Component({
        selector: 'vex-widget-quick-value-start',
        templateUrl: './widget-quick-value-start.component.html',
        animations: [scaleInOutAnimation],
        standalone: true,
        imports: [
            MatIconModule,
            NgIf,
            MatButtonModule,
            MatTooltipModule,
            MatBottomSheetModule
        ]
    })
], WidgetQuickValueStartComponent);
export { WidgetQuickValueStartComponent };
//# sourceMappingURL=widget-quick-value-start.component.js.map