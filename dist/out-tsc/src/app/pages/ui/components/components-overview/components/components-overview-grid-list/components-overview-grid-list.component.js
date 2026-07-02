import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { VexHighlightDirective } from "../../../../../../../@vex/components/vex-highlight/vex-highlight.directive";
import { MatTabsModule } from '@angular/material/tabs';
import { NgFor } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
let ComponentsOverviewGridListComponent = class ComponentsOverviewGridListComponent {
    constructor() {
        this.tiles = [
            { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
            { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
            { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
            { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' }
        ];
        this.gridListHTML = `<mat-grid-list cols="4" rowHeight="100px">
  <mat-grid-tile *ngFor="let tile of tiles" [colspan]="tile.cols" [rowspan]="tile.rows"
                  [style.background]="tile.color">
      {{tile.text}}
  </mat-grid-tile>
</mat-grid-list>`;
    }
    ngOnInit() { }
};
ComponentsOverviewGridListComponent = __decorate([
    Component({
        selector: 'vex-components-overview-grid-list',
        templateUrl: './components-overview-grid-list.component.html',
        styleUrls: ['./components-overview-grid-list.component.scss'],
        standalone: true,
        imports: [MatGridListModule, NgFor, MatTabsModule, VexHighlightDirective]
    })
], ComponentsOverviewGridListComponent);
export { ComponentsOverviewGridListComponent };
//# sourceMappingURL=components-overview-grid-list.component.js.map