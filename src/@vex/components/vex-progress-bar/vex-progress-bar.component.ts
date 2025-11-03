import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  LOADING_BAR_CONFIG,
  LoadingBarConfig,
  LoadingBarModule,
  LoadingBarService
} from '@ngx-loading-bar/core';
import { delayWhen, interval, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Component({
  selector: 'vex-progress-bar',
  templateUrl: './vex-progress-bar.component.html',
  styleUrls: ['./vex-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatProgressBarModule,
    LoadingBarModule,
    LoadingBarRouterModule,
    AsyncPipe
  ],
  providers: [
    {
      provide: LOADING_BAR_CONFIG,
      useValue: {
        latencyThreshold: 80
      } as LoadingBarConfig
    }
  ]
})
export class VexProgressBarComponent {
  value$: Observable<number> = this.loader
    .useRef('router')
    .value$.pipe(
      delayWhen((value) => (value === 0 ? interval(200) : of(undefined)))
    );

  constructor(public loader: LoadingBarService) {}
}
