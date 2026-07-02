import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { VexPageLayoutComponent } from "../../../../@vex/components/vex-page-layout/vex-page-layout.component";
import { VexPageLayoutContentDirective } from "../../../../@vex/components/vex-page-layout/vex-page-layout-content.directive";
import { fadeInRight400ms } from "../../../../@vex/animations/fade-in-right.animation";
let MantenimientosComponent = class MantenimientosComponent {
    constructor(router) {
        this.router = router;
        this.activeTab = 'vehicular';
        this.tabs = [
            {
                id: 'vehicular',
                label: 'Servicios de Mantenimiento',
                route: '/administracion/mantenimientos/mantenimiento-vehicular',
                icon: 'mat:time_to_leave'
            },
            {
                id: 'combustible',
                label: 'Control de Combustible',
                route: '/administracion/mantenimientos/mantenimiento-combustible',
                icon: 'mat:local_gas_station'
            },
            {
                id: 'kilometraje',
                label: 'Administración de Kilometraje',
                route: '/administracion/mantenimientos/mantenimiento-kilometraje',
                icon: 'mat:speed'
            }
        ];
    }
    ngOnInit() {
        // Determinar la tab activa basándose en la ruta actual
        this.updateActiveTab();
        // Suscribirse a los cambios de ruta
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
            this.updateActiveTab();
        });
    }
    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
    updateActiveTab() {
        const currentRoute = this.router.url;
        if (currentRoute.includes('mantenimiento-vehicular')) {
            this.activeTab = 'vehicular';
        }
        else if (currentRoute.includes('mantenimiento-combustible')) {
            this.activeTab = 'combustible';
        }
        else if (currentRoute.includes('mantenimiento-kilometraje')) {
            this.activeTab = 'kilometraje';
        }
        else {
            // Por defecto, mostrar mantenimiento vehicular
            this.activeTab = 'vehicular';
        }
    }
    setActiveTab(tabId, route) {
        this.activeTab = tabId;
        this.router.navigate([route]);
    }
};
MantenimientosComponent = __decorate([
    Component({
        selector: 'vex-mantenimientos',
        standalone: true,
        imports: [
            CommonModule,
            RouterModule,
            RouterOutlet,
            MatIconModule,
            VexPageLayoutComponent,
            VexPageLayoutContentDirective
        ],
        templateUrl: './mantenimientos.component.html',
        styleUrl: './mantenimientos.component.scss',
        animations: [fadeInRight400ms]
    })
], MantenimientosComponent);
export { MantenimientosComponent };
//# sourceMappingURL=mantenimientos.component.js.map