import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
let ShareBottomSheetComponent = class ShareBottomSheetComponent {
    constructor(_bottomSheetRef) {
        this._bottomSheetRef = _bottomSheetRef;
    }
    ngOnInit() { }
    close() {
        this._bottomSheetRef.dismiss();
    }
};
ShareBottomSheetComponent = __decorate([
    Component({
        selector: 'vex-share-bottom-sheet',
        templateUrl: './share-bottom-sheet.component.html',
        styleUrls: ['./share-bottom-sheet.component.scss'],
        standalone: true,
        imports: [MatListModule, RouterLink, MatIconModule, MatBottomSheetModule]
    })
], ShareBottomSheetComponent);
export { ShareBottomSheetComponent };
//# sourceMappingURL=share-bottom-sheet.component.js.map