import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { combineLatest, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import { VexSidebarComponent } from "../../../@vex/components/vex-sidebar/vex-sidebar.component";
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import { SidenavComponent } from '../components/sidenav/sidenav.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { QuickpanelComponent } from '../components/quickpanel/quickpanel.component';
import { ConfigPanelToggleComponent } from '../components/config-panel/config-panel-toggle/config-panel-toggle.component';
import { ConfigPanelComponent } from '../components/config-panel/config-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SearchComponent } from '../components/toolbar/search/search.component';
import { VexProgressBarComponent } from "../../../@vex/components/vex-progress-bar/vex-progress-bar.component";
let LayoutComponent = class LayoutComponent {
    constructor(layoutService, configService) {
        this.layoutService = layoutService;
        this.configService = configService;
        this.config$ = this.configService.config$;
        this.sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
        this.sidenavDisableClose$ = this.layoutService.isDesktop$;
        this.sidenavFixedInViewport$ = this.layoutService.isDesktop$.pipe(map((isDesktop) => !isDesktop));
        this.sidenavMode$ = combineLatest([
            this.layoutService.isDesktop$,
            this.configService.select((config) => config.layout)
        ]).pipe(map(([isDesktop, layout]) => !isDesktop || layout === 'vertical' ? 'over' : 'side'));
        this.sidenavOpen$ = this.layoutService.sidenavOpen$;
        this.configPanelOpen$ = this.layoutService.configPanelOpen$;
        this.quickpanelOpen$ = this.layoutService.quickpanelOpen$;
        this.collapsed = false;
        this.showCollapsePin$ = of(true);
        this.sub = new Subscription();
        // Si tu LayoutService expone el colapso como observable:
        if (this.layoutService.sidenavCollapsed$) {
            this.sub.add(this.layoutService.sidenavCollapsed$.subscribe((v) => (this.collapsed = !!v)));
        }
        else if (this.layoutService.isSidenavCollapsed !== undefined) {
            // fallback si es un boolean directo
            this.collapsed = !!this.layoutService.isSidenavCollapsed;
        }
        // Mostrar/ocultar el pin desde el servicio si existe (sino true por defecto)
        if (this.layoutService.showCollapsePin$) {
            this.showCollapsePin$ = this.layoutService.showCollapsePin$;
        }
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    onSidenavClosed() {
        this.layoutService.closeSidenav();
    }
    onQuickpanelClosed() {
        this.layoutService.closeQuickpanel();
    }
};
LayoutComponent = __decorate([
    Component({
        selector: 'vex-layout',
        templateUrl: './layout.component.html',
        styleUrls: ['./layout.component.scss'],
        imports: [
            BaseLayoutComponent,
            NgIf,
            AsyncPipe,
            SidenavComponent,
            ToolbarComponent,
            FooterComponent,
            QuickpanelComponent,
            ConfigPanelToggleComponent,
            VexSidebarComponent,
            ConfigPanelComponent,
            MatDialogModule,
            MatSidenavModule,
            NgTemplateOutlet,
            RouterOutlet,
            SearchComponent,
            VexProgressBarComponent
        ],
        standalone: true
    })
], LayoutComponent);
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map