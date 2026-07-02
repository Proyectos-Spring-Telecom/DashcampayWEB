import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
let ComponentsOverviewDialogsComponent = class ComponentsOverviewDialogsComponent {
    constructor(dialog) {
        this.dialog = dialog;
        this.dialogHTML = `<button mat-raised-button type="button" (click)="openDialog()" color="primary">Open Dialog</button>
<p *ngIf="result">You chose: {{ result }}</p>
`;
    }
    openDialog() {
        this.dialog
            .open(DemoDialogComponent, {
            disableClose: false,
            width: '400px'
        })
            .afterClosed()
            .subscribe((result) => {
            this.result = result;
        });
    }
};
ComponentsOverviewDialogsComponent = __decorate([
    Component({
        selector: 'vex-components-overview-dialogs',
        templateUrl: './components-overview-dialogs.component.html',
        styleUrls: ['./components-overview-dialogs.component.scss'],
        standalone: true,
        imports: [MatButtonModule, NgIf, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewDialogsComponent);
export { ComponentsOverviewDialogsComponent };
let DemoDialogComponent = class DemoDialogComponent {
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
    close(answer) {
        this.dialogRef.close(answer);
    }
};
DemoDialogComponent = __decorate([
    Component({
        selector: 'vex-components-overview-demo-dialog',
        template: `
    <div mat-dialog-title class="flex items-center justify-between">
      <div>Question</div>
      <button
        type="button"
        mat-icon-button
        (click)="close('No answer')"
        tabindex="-1">
        <mat-icon svgIcon="mat:close"></mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <p>Do you like Pizza?</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="close('No')">No</button>
      <button mat-button color="primary" (click)="close('Yes')">Yes</button>
    </mat-dialog-actions>
  `,
        standalone: true,
        imports: [MatDialogModule, MatButtonModule, MatIconModule]
    })
], DemoDialogComponent);
export { DemoDialogComponent };
//# sourceMappingURL=components-overview-dialogs.component.js.map