import {
  AfterViewInit,
  Component,
  ContentChild,
  DestroyRef,
  inject,
  Inject,
  OnInit
} from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import {
  MatSidenavContainer,
  MatSidenavModule
} from '@angular/material/sidenav';
import {
  Event,
  NavigationEnd,
  Router,
  RouterOutlet,
  Scroll
} from '@angular/router';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { checkRouterChildsData } from '@vex/utils/check-router-childs-data';
import { AsyncPipe, DOCUMENT, NgIf, NgTemplateOutlet } from '@angular/common';
import { VexConfigService } from '@vex/config/vex-config.service';
import { SearchComponent } from '../components/toolbar/search/search.component';
import { VexProgressBarComponent } from '@vex/components/vex-progress-bar/vex-progress-bar.component';
import { isNil } from '@vex/utils/is-nil';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { VexConfig } from '@vex/config/vex-config.interface';

@Component({
  selector: 'vex-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  standalone: true,
  imports: [
    VexProgressBarComponent,
    SearchComponent,
    MatSidenavModule,
    NgTemplateOutlet,
    RouterOutlet,
    AsyncPipe,
    NgIf
  ]
})
export class BaseLayoutComponent implements OnInit, AfterViewInit {
  config$: Observable<VexConfig> = this.configService.config$;

  /**
   * Check if footer should be visible
   */
  isFooterVisible$ = combineLatest([
    /**
     * Check if footer is enabled in the config
     */
    this.configService.config$.pipe(map((config) => config.footer.visible)),
    /**
     * Check if footer is enabled on the current route
     */
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() =>
        checkRouterChildsData(
          this.router.routerState.root.snapshot,
          (data) => data.footerVisible ?? true
        )
      )
    )
  ]).pipe(
    map(([configEnabled, routeEnabled]) => {
      if (isNil(routeEnabled)) {
        return configEnabled;
      }

      return configEnabled && routeEnabled;
    })
  );
  sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
  isDesktop$ = this.layoutService.isDesktop$;

  scrollDisabled$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(null),
    map(() =>
      checkRouterChildsData(
        this.router.routerState.root.snapshot,
        (data) => data.scrollDisabled ?? false
      )
    )
  );

  searchOpen$ = this.layoutService.searchOpen$;

  @ContentChild(MatSidenavContainer, { static: true })
  sidenavContainer!: MatSidenavContainer;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly layoutService: VexLayoutService,
    private readonly configService: VexConfigService,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit() {
    /**
     * Open sidenav on desktop when layout is not vertical
     * Close sidenav on mobile or when layout is vertical
     */
    combineLatest([
      this.isDesktop$,
      this.configService.select((config) => config.layout === 'vertical')
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([isDesktop, isVerticalLayout]) => {
        if (isDesktop && !isVerticalLayout) {
          this.layoutService.openSidenav();
        } else {
          this.layoutService.closeSidenav();
        }
      });

    /**
     * Mobile only:
     * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
     */
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        withLatestFrom(this.isDesktop$),
        filter(([event, matches]) => !matches),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.layoutService.closeSidenav());
  }

  ngAfterViewInit(): void {
    /**
     * Enable Scrolling to specific parts of the page using the Router
     */
    this.router.events
      .pipe(
        filter<Event, Scroll>((e: Event): e is Scroll => e instanceof Scroll),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((e) => {
        if (e.position) {
          // backward navigation
          this.sidenavContainer.scrollable.scrollTo({
            start: e.position[0],
            top: e.position[1]
          });
        } else if (e.anchor) {
          // anchor navigation

          const scroll = (anchor: HTMLElement) =>
            this.sidenavContainer.scrollable.scrollTo({
              behavior: 'smooth',
              top: anchor.offsetTop,
              left: anchor.offsetLeft
            });

          let anchorElem = this.document.getElementById(e.anchor);

          if (anchorElem) {
            scroll(anchorElem);
          } else {
            setTimeout(() => {
              if (!e.anchor) {
                return;
              }

              anchorElem = this.document.getElementById(e.anchor);

              if (!anchorElem) {
                return;
              }

              scroll(anchorElem);
            }, 100);
          }
        } else {
          // forward navigation
          this.sidenavContainer.scrollable.scrollTo({
            top: 0,
            start: 0
          });
        }
      });
  }
}
