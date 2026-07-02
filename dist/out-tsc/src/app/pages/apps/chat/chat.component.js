import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import { of } from 'rxjs';
import { delay, filter, startWith, switchMap } from 'rxjs/operators';
import { trackById } from "../../../../@vex/utils/track-by";
import { stagger80ms } from "../../../../@vex/animations/stagger.animation";
import { NavigationEnd, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { VexScrollbarComponent } from "../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let ChatComponent = class ChatComponent {
    constructor(cd, router, layoutService, chatService) {
        this.cd = cd;
        this.router = router;
        this.layoutService = layoutService;
        this.chatService = chatService;
        this.chats$ = of(this.chatService.chats).pipe(
        // Fix to allow stagger animations with static data
        delay(0));
        this.mobileQuery$ = this.layoutService.ltMd$;
        this.drawerOpen$ = this.chatService.drawerOpen$;
        this.trackById = trackById;
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), startWith(null), switchMap(() => this.mobileQuery$), filter((isMobile) => isMobile), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.closeDrawer());
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), startWith(null), switchMap(() => this.mobileQuery$), filter((isMobile) => !isMobile), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.openDrawer());
    }
    drawerChange(drawerOpen) {
        this.chatService.drawerOpen.next(drawerOpen);
    }
    openDrawer() {
        this.chatService.drawerOpen.next(true);
        this.cd.markForCheck();
    }
    closeDrawer() {
        this.chatService.drawerOpen.next(false);
        this.cd.markForCheck();
    }
};
ChatComponent = __decorate([
    Component({
        selector: 'vex-chat',
        templateUrl: './chat.component.html',
        styleUrls: ['./chat.component.scss'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        animations: [fadeInUp400ms, stagger80ms],
        standalone: true,
        imports: [
            MatSidenavModule,
            MatMenuModule,
            MatIconModule,
            NgClass,
            NgIf,
            VexScrollbarComponent,
            NgFor,
            MatRippleModule,
            RouterLinkActive,
            RouterLink,
            RouterOutlet,
            AsyncPipe,
            MatButtonModule,
            MatDividerModule,
            MatInputModule
        ]
    })
], ChatComponent);
export { ChatComponent };
//# sourceMappingURL=chat.component.js.map