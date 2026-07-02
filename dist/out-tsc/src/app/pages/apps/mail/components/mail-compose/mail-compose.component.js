import { __decorate } from "tslib";
import { Component, ViewEncapsulation } from '@angular/core';
import { dropdownAnimation } from "../../../../../../@vex/animations/dropdown.animation";
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { QuillEditorComponent } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
let MailComposeComponent = class MailComposeComponent {
    constructor(cd, dialogRef) {
        this.cd = cd;
        this.dialogRef = dialogRef;
        this.dropdownOpen = false;
    }
    ngOnInit() { }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        this.cd.markForCheck();
    }
    submit() {
        this.dialogRef.close();
    }
};
MailComposeComponent = __decorate([
    Component({
        selector: 'vex-mail-compose',
        templateUrl: './mail-compose.component.html',
        styleUrls: [
            '../../../../../../../node_modules/quill/dist/quill.snow.css',
            './mail-compose.component.scss'
        ],
        animations: [dropdownAnimation],
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [
            MatDialogModule,
            MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            QuillEditorComponent,
            MatRippleModule,
            MatTooltipModule
        ]
    })
], MailComposeComponent);
export { MailComposeComponent };
//# sourceMappingURL=mail-compose.component.js.map