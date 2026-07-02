import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
let ComponentsOverviewInputComponent = class ComponentsOverviewInputComponent {
    constructor(cd) {
        this.cd = cd;
        this.inputHTML = `<mat-form-field>
  <button *ngIf="!visible" type="button" mat-icon-button matIconPrefix (click)="show()">
    <mat-icon>lock</mat-icon>
  </button>
  <button *ngIf="visible" type="button" mat-icon-button matIconPrefix (click)="hide()">
    <mat-icon>lock_open</mat-icon>
  </button>
  <mat-label>Password</mat-label>
  <input matInput [type]="inputType">
  <button *ngIf="!visible" type="button" mat-icon-button matIconSuffix (click)="show()">
    <mat-icon>visibility</mat-icon>
  </button>
  <button *ngIf="visible" type="button" mat-icon-button matIconSuffix (click)="hide()">
    <mat-icon>visibility_off</mat-icon>
  </button>
</mat-form-field>`;
        this.inputType = 'password';
        this.visible = false;
    }
    ngOnInit() { }
    show() {
        this.inputType = 'text';
        this.visible = true;
        this.cd.markForCheck();
    }
    hide() {
        this.inputType = 'password';
        this.visible = false;
        this.cd.markForCheck();
    }
};
ComponentsOverviewInputComponent = __decorate([
    Component({
        selector: 'vex-components-overview-input',
        templateUrl: './components-overview-input.component.html',
        styleUrls: ['./components-overview-input.component.scss'],
        standalone: true,
        imports: [
            MatFormFieldModule,
            NgIf,
            MatButtonModule,
            MatIconModule,
            MatInputModule,
            MatTabsModule,
            VexHighlightDirective
        ]
    })
], ComponentsOverviewInputComponent);
export { ComponentsOverviewInputComponent };
//# sourceMappingURL=components-overview-input.component.js.map