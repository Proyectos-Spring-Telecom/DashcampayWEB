import { Component, OnInit } from '@angular/core';
import { VexPopoverRef } from '@vex/components/vex-popover/vex-popover-ref';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'vex-sidenav-user-menu',
  templateUrl: './sidenav-user-menu.component.html',
  styleUrls: ['./sidenav-user-menu.component.scss'],
  imports: [MatRippleModule, MatIconModule],
  standalone: true
})
export class SidenavUserMenuComponent implements OnInit {
  loggingOut = false;

  constructor(
    private readonly popoverRef: VexPopoverRef,
    private readonly auth: AuthenticationService
  ) {}

  ngOnInit(): void {}

  close(): void {
    setTimeout(() => this.popoverRef.close(), 250);
  }

  cerrarSesion(): void {
    if (this.loggingOut) return;
    this.loggingOut = true;
    this.close();
    this.auth.logout().subscribe({
      complete: () => {
        this.loggingOut = false;
      },
      error: () => {
        this.loggingOut = false;
      },
    });
  }
}
