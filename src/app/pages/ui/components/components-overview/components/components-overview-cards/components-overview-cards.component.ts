import { Component, OnInit } from '@angular/core';
import { VexHighlightDirective } from '@vex/components/vex-highlight/vex-highlight.directive';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'vex-components-overview-cards',
  templateUrl: './components-overview-cards.component.html',
  styleUrls: ['./components-overview-cards.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VexHighlightDirective
  ]
})
export class ComponentsOverviewCardsComponent implements OnInit {
  cardHTML = `<mat-card>
  <mat-card-header>
    <img mat-card-avatar src="assets/img/avatars/3.jpg">
    <mat-card-title>Gerald Morris</mat-card-title>
    <mat-card-subtitle>Yesterday</mat-card-subtitle>
  </mat-card-header>
  <img mat-card-image src="assets/img/backgrounds/1.jpg">
  <mat-card-content>
    <p>Piqued favour stairs it enable exeter as seeing. Remainder met improving but engrossed sincerity age. Better but length gay denied abroad are. Attachment astonished to on appearance imprudence so collecting in excellence. Tiled way blind lived whose new. The for fully had she there leave merit enjoy forth. </p>
  </mat-card-content>
  <mat-divider></mat-divider>
  <mat-card-actions>
    <div class="flex">
      <button mat-icon-button>
        <mat-icon>share</mat-icon>
      </button>
      <button mat-icon-button>
        <mat-icon>favorite</mat-icon>
      </button>
      <span class="flex-1"></span>
      <button mat-button>
        More Info
      </button>
      <button mat-button>
        Save as
      </button>
    </div>
  </mat-card-actions>
</mat-card>`;

  constructor() {}

  ngOnInit() {}
}
