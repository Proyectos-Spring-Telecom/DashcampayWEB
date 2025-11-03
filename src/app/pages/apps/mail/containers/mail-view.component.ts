import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MailService } from '../services/mail.service';
import { map } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Mail } from '../interfaces/mail.interface';
import { dropdownAnimation } from '@vex/animations/dropdown.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { VexDateFormatRelativePipe } from '@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe';
import { MatRippleModule } from '@angular/material/core';
import { MailAttachmentComponent } from '../components/mail-attachment/mail-attachment.component';
import { MatMenuModule } from '@angular/material/menu';
import { MailLabelComponent } from '../components/mail-label/mail-label.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vex-mail-view',
  templateUrl: './mail-view.component.html',
  styleUrls: ['./mail-view.component.scss'],
  animations: [dropdownAnimation, fadeInUp400ms],
  standalone: true,
  imports: [
    NgIf,
    VexScrollbarComponent,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    NgFor,
    MailLabelComponent,
    NgClass,
    MatMenuModule,
    MailAttachmentComponent,
    MatRippleModule,
    AsyncPipe,
    DatePipe,
    VexDateFormatRelativePipe
  ]
})
export class MailViewComponent implements OnInit, OnDestroy {
  mail$: Observable<Mail | undefined> = combineLatest([
    this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('mailId')),
      map((mailId) => (mailId != null ? Number.parseInt(mailId) : undefined))
    ),
    this.mailService.mails$
  ]).pipe(map(([mailId, mails]) => mails?.find((m) => m.id === mailId)));

  gtSm$ = this.layoutService.gtSm$;

  dropdownOpen = true;

  constructor(
    private route: ActivatedRoute,
    private mailService: MailService,
    private layoutService: VexLayoutService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.cd.markForCheck();
  }

  ngOnDestroy() {}
}
