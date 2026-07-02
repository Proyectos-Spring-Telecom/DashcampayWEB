import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let ToolbarSearchComponent = class ToolbarSearchComponent {
    constructor(cd) {
        this.cd = cd;
        this.isOpen = false;
    }
    ngOnInit() { }
    open() {
        this.isOpen = true;
        this.cd.markForCheck();
        setTimeout(() => {
            this.input?.nativeElement.focus();
        }, 100);
    }
    close() {
        this.isOpen = false;
        this.cd.markForCheck();
    }
};
__decorate([
    ViewChild('input', { read: ElementRef, static: true })
], ToolbarSearchComponent.prototype, "input", void 0);
ToolbarSearchComponent = __decorate([
    Component({
        selector: 'vex-toolbar-search',
        templateUrl: './toolbar-search.component.html',
        styleUrls: ['./toolbar-search.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule]
    })
], ToolbarSearchComponent);
export { ToolbarSearchComponent };
//# sourceMappingURL=toolbar-search.component.js.map