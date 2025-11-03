import { Component, Input } from '@angular/core';
import { VexConfigService } from '../../config/vex-config.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'vex-secondary-toolbar',
  template: `
    <div class="secondary-toolbar-placeholder">&nbsp;</div>

    <div
      [ngClass]="{ fixed: fixed$ | async, 'w-full': !(fixed$ | async) }"
      class="secondary-toolbar py-1 z-40 border-t flex">
      <div
        class="px-6 flex items-center flex-auto"
        [class.container]="isVerticalLayout$ | async">
        <h1
          *ngIf="current"
          class="subheading-2 font-medium m-0 ltr:pr-3 rtl:pl-3 ltr:border-r rtl:border-l ltr:mr-3 rtl:ml-3 flex-none">
          {{ current }}
        </h1>

        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./vex-secondary-toolbar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AsyncPipe]
})
export class VexSecondaryToolbarComponent {
  @Input() current?: string;

  fixed$ = this.configService.config$.pipe(
    map((config) => config.toolbar.fixed)
  );

  isVerticalLayout$: Observable<boolean> = this.configService
    .select((config) => config.layout)
    .pipe(map((layout) => layout === 'vertical'));

  constructor(private readonly configService: VexConfigService) {}
}
