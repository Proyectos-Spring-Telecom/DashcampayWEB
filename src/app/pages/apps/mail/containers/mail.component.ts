import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { map } from 'rxjs/operators';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenavModule
} from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { MatDialog } from '@angular/material/dialog';
import { MailComposeComponent } from '../components/mail-compose/mail-compose.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MailService } from '../services/mail.service';
import { VexConfigService } from '@vex/config/vex-config.service';
import { RouterOutlet } from '@angular/router';
import { MailSidenavComponent } from '../components/mail-sidenav/mail-sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'vex-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
  animations: [scaleIn400ms, fadeInRight400ms],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatSidenavModule,
    NgIf,
    MatIconModule,
    MatButtonModule,
    MailSidenavComponent,
    ReactiveFormsModule,
    NgClass,
    RouterOutlet,
    AsyncPipe,
    MatInputModule
  ]
})
export class MailComponent implements OnInit {
  isDesktop$ = this.layoutService.isDesktop$;
  ltLg$ = this.layoutService.ltLg$;
  drawerMode$: Observable<MatDrawerMode> = this.isDesktop$.pipe(
    map((isDesktop) => (isDesktop ? 'side' : 'over'))
  );
  isVerticalLayout$: Observable<boolean> = this.configService.select(
    (config) => config.layout === 'vertical'
  );

  drawerOpen = true;

  searchCtrl = new UntypedFormControl();

  @ViewChild(MatDrawer, { static: true }) private drawer?: MatDrawer;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private readonly layoutService: VexLayoutService,
    private readonly mailService: MailService,
    private readonly configService: VexConfigService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    /**
     * Expand Drawer when we switch from mobile to desktop view
     */
    this.isDesktop$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isDesktop) => {
        if (isDesktop) {
          this.drawer?.open();
        } else {
          this.drawer?.close();
        }
      });

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.mailService.filterValue.next(value));
  }

  openCompose() {
    this.dialog.open(MailComposeComponent, {
      width: '100%',
      maxWidth: 600
    });
  }
}
