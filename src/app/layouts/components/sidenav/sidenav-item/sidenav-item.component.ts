import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  HostBinding,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  NavigationDropdown,
  NavigationItem,
  NavigationLink
} from '../../../../core/navigation/navigation-item.interface';
import { dropdownAnimation } from '@vex/animations/dropdown.animation';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../../../../core/navigation/navigation.service';

import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { HasPermissionDirective } from 'src/app/pages/services/haspermission.directive';

@Component({
  selector: 'vex-sidenav-item',
  templateUrl: './sidenav-item.component.html',
  styleUrls: ['./sidenav-item.component.scss'],
  animations: [dropdownAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    MatRippleModule,
    RouterLinkActive,
    RouterLink,
    MatIconModule,
    NgClass,
    NgFor,
    HasPermissionDirective   
  ]
})
export class SidenavItemComponent implements OnInit, OnChanges {
  @Input({ required: true }) item!: NavigationItem;
  @Input({ required: true }) level!: number;
  isOpen: boolean = false;
  isActive: boolean = false;

  isLink = this.navigationService.isLink;
  isDropdown = this.navigationService.isDropdown;
  isSubheading = this.navigationService.isSubheading;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private navigationService: NavigationService,
    private auth: AuthenticationService
  ) {
    
  }

  @HostBinding('class')
  get levelClass() {
    return `item-level-${this.level}`;
  }

  private canSee(item: NavigationItem): boolean {
    const req = item?.permissions || [];
    if (!req.length) return true;
    const have = (this.auth.getPermissions() || []).map(p => String(p).trim());
    return req.map(String).some(p => have.includes(p));
  }

  visibleChildren(item: NavigationItem) {
    const children = (item as any)?.children || [];
    return children.filter((c: NavigationItem) => this.canSee(c));
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.onRouteChange());

    this.navigationService.openChange$
      .pipe(
        filter(() => this.isDropdown(this.item)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((item) => this.onOpenChange(item));

    this.onRouteChange(); // Inicializa estado activo también al cargar
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes &&
      changes.hasOwnProperty('item')
    ) {
      this.onRouteChange();
    }
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
    this.cd.markForCheck();
  }

  onOpenChange(item: NavigationDropdown) {
    if (this.isDropdown(this.item) && this.isChildrenOf(this.item as NavigationDropdown, item)) {
      return;
    }

    if (this.isDropdown(this.item) && this.hasActiveChilds(this.item as NavigationDropdown)) {
      return;
    }

    if (this.item !== item) {
      this.isOpen = false;
      this.cd.markForCheck();
    }
  }

  onRouteChange() {
  if (this.isDropdown(this.item)) {
    const wasActive = this.isActive;
    this.isActive = this.hasActiveChilds(this.item as NavigationDropdown);

    // Opcional: abre el menú si entra directo a ruta hija
    if (this.isActive) {
      this.isOpen = true;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
    } else if (wasActive) {
      // Cierra el menú si ya no está activo (opcional)
      this.isOpen = false;
      this.navigationService.triggerOpenChange(this.item as NavigationDropdown);
    }
    this.cd.markForCheck();
  } else if (this.isLink(this.item) && !this.isFunction(this.item.route)) {
    this.isActive = this.router.isActive(this.item.route as string, false);
    this.cd.markForCheck();
  }
}


  isChildrenOf(parent: NavigationDropdown, item: NavigationDropdown): boolean {
    if (parent.children.indexOf(item) !== -1) {
      return true;
    }
    return parent.children
      .filter((child) => this.isDropdown(child))
      .some((child) => this.isChildrenOf(child as NavigationDropdown, item));
  }

  hasActiveChilds(parent: NavigationDropdown): boolean {
    return parent.children.some((child) => {
      if (this.isDropdown(child)) {
        return this.hasActiveChilds(child);
      }
      if (this.isLink(child) && !this.isFunction(child.route)) {
        return this.router.isActive(child.route as string, false);
      }
      return false;
    });
  }

  isFunction(prop: NavigationLink['route']): boolean {
    return prop instanceof Function;
  }
}
