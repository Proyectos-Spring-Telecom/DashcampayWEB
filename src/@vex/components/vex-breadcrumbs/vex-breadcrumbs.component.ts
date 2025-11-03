import { Component, Input } from '@angular/core';
import { trackByValue } from '../../utils/track-by';
import { VexBreadcrumbComponent } from './vex-breadcrumb/vex-breadcrumb.component';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vex-breadcrumbs',
  template: `
    <div class="flex items-center gap-2">
      <vex-breadcrumb>
        <a [routerLink]="['/']">
          <mat-icon svgIcon="mat:home" class="icon-sm"></mat-icon>
        </a>
      </vex-breadcrumb>
      <ng-container *ngFor="let crumb of crumbs; trackBy: trackByValue">
        <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
        <vex-breadcrumb>
          <a [routerLink]="[]">{{ crumb }}</a>
        </vex-breadcrumb>
      </ng-container>
    </div>
  `,
  standalone: true,
  imports: [VexBreadcrumbComponent, RouterLink, NgFor, MatIconModule]
})
export class VexBreadcrumbsComponent {
  @Input() crumbs: string[] = [];

  trackByValue = trackByValue;
}
