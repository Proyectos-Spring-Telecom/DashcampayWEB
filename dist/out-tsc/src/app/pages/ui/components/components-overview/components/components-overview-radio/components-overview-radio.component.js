import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
let ComponentsOverviewRadioComponent = class ComponentsOverviewRadioComponent {
    constructor() {
        this.radioHTML = `<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button class="radio" *ngFor="let season of seasons" [value]="season">
    {{ season }}
  </mat-radio-button>
</mat-radio-group>`;
        this.seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
        this.favoriteSeason = this.seasons[2];
    }
    ngOnInit() { }
};
ComponentsOverviewRadioComponent = __decorate([
    Component({
        selector: 'vex-components-overview-radio',
        templateUrl: './components-overview-radio.component.html',
        styleUrls: ['./components-overview-radio.component.scss'],
        standalone: true,
        imports: [
            MatRadioModule,
            ReactiveFormsModule,
            FormsModule,
            NgFor,
            MatTabsModule,
            VexHighlightDirective
        ]
    })
], ComponentsOverviewRadioComponent);
export { ComponentsOverviewRadioComponent };
//# sourceMappingURL=components-overview-radio.component.js.map