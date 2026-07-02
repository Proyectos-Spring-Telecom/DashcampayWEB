import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ShareBottomSheetComponent } from '../../share-bottom-sheet/share-bottom-sheet.component';
import { scaleInOutAnimation } from "../../../../../../@vex/animations/scale-in-out.animation";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
let WidgetQuickValueCenterComponent = class WidgetQuickValueCenterComponent {
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
], WidgetQuickValueCenterComponent.prototype, "icon", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueCenterComponent.prototype, "value", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueCenterComponent.prototype, "label", void 0);
__decorate([
    Input({ required: true })
], WidgetQuickValueCenterComponent.prototype, "change", void 0);
__decorate([
    Input()
], WidgetQuickValueCenterComponent.prototype, "helpText", void 0);
__decorate([
    Input()
], WidgetQuickValueCenterComponent.prototype, "iconClass", void 0);
WidgetQuickValueCenterComponent = __decorate([
    Component({
        selector: 'vex-widget-quick-value-center',
        templateUrl: './widget-quick-value-center.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [scaleInOutAnimation],
        standalone: true,
        imports: [
            NgClass,
            MatIconModule,
            NgIf,
            MatButtonModule,
            MatTooltipModule,
            MatBottomSheetModule
        ]
    })
], WidgetQuickValueCenterComponent);
export { WidgetQuickValueCenterComponent };
//# sourceMappingURL=widget-quick-value-center.component.js.map