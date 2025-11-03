import { Component, OnInit } from '@angular/core';
import { MailService } from '../services/mail.service';
import { VexLayoutService } from '@vex/services/vex-layout.service';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { trackById } from '@vex/utils/track-by';
import { SelectionModel } from '@angular/cdk/collections';
import { Mail } from '../interfaces/mail.interface';
import {
  MatCheckboxChange,
  MatCheckboxModule
} from '@angular/material/checkbox';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { getAllParams } from '@vex/utils/check-router-childs-data';
import { MailListEntryComponent } from '../components/mail-list-entry/mail-list-entry.component';
import { VexScrollbarComponent } from '@vex/components/vex-scrollbar/vex-scrollbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'vex-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    NgIf,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    VexScrollbarComponent,
    NgFor,
    MailListEntryComponent,
    RouterOutlet,
    AsyncPipe
  ]
})
export class MailListComponent implements OnInit {
  mails$ = this.mailService.filteredMails$;
  gtSm$ = this.layoutService.gtSm$;

  hasActiveMail$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => getAllParams(this.router.routerState.root.snapshot)),
    map((params) => params.has('mailId')),
    distinctUntilChanged()
  );

  trackById = trackById;

  selection = new SelectionModel<Mail['id']>(true, []);

  constructor(
    private mailService: MailService,
    private layoutService: VexLayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  masterToggle(mails: Mail[] | null, change: MatCheckboxChange) {
    if (!mails) {
      return;
    }

    if (change.checked) {
      this.selection.select(...mails.map((mail) => mail.id));
    } else {
      this.selection.deselect(...mails.map((mail) => mail.id));
    }
  }

  isAllSelected(mails: Mail[]): boolean {
    return (
      mails?.length > 0 && mails?.length === this.selection.selected?.length
    );
  }

  isSomeButNotAllSelected(mails: Mail[]): boolean {
    return !this.isAllSelected(mails) && this.selection.hasValue();
  }
}
