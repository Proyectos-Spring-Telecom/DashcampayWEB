import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, Subscription } from 'rxjs';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';

@Component({
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
export class MantenimientosComponent implements OnInit, OnDestroy {
  activeTab: string = 'vehicular';
  private routerSubscription?: Subscription;

  tabs = [
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Determinar la tab activa basándose en la ruta actual
    this.updateActiveTab();
    
    // Suscribirse a los cambios de ruta
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateActiveTab();
      });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateActiveTab(): void {
    const currentRoute = this.router.url;
    if (currentRoute.includes('mantenimiento-vehicular')) {
      this.activeTab = 'vehicular';
    } else if (currentRoute.includes('mantenimiento-combustible')) {
      this.activeTab = 'combustible';
    } else if (currentRoute.includes('mantenimiento-kilometraje')) {
      this.activeTab = 'kilometraje';
    } else {
      // Por defecto, mostrar mantenimiento vehicular
      this.activeTab = 'vehicular';
    }
  }

  setActiveTab(tabId: string, route: string): void {
    this.activeTab = tabId;
    this.router.navigate([route]);
  }
}
