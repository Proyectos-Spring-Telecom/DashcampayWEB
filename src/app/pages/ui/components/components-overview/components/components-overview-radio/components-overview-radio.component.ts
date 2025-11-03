import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { NgFor } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
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
export class ComponentsOverviewRadioComponent implements OnInit {
  radioHTML = `<mat-radio-group [(ngModel)]="favoriteSeason">
  <mat-radio-button class="radio" *ngFor="let season of seasons" [value]="season">
    {{ season }}
  </mat-radio-button>
</mat-radio-group>`;

  seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];

  favoriteSeason = this.seasons[2];

  constructor() {}

  ngOnInit() {}
}
